/* eslint-disable no-console */
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-router-server';

import { v4 } from 'uuid';
import cookieParser from 'cookie-parser';
import serializeError from 'serialize-error';

import { port, host, basename, publicPath, isDev, cookieDomain, } from 'sly/config';
import configureStore from 'sly/store/configure';
import apiService from 'sly/services/api';
import App from 'sly/components/App';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';

const renderApp = ({ store, context, location, sheet }) => {
  const app = sheet.collectStyles((
    <Provider store={store}>
      <StaticRouter basename={basename} context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  ));
  return renderToString(app);
};

const renderHtml = ({ serverState, initialState, content, sheet, assets }) => {
  const styles = sheet.getStyleElement();

  const state = `
    window.__SERVER_STATE__ = ${serialize(serverState)};
    window.__INITIAL_STATE__ = ${serialize(initialState)};
  `;

  const props = {
    styles,
    assets,
    state,
    content,
  };
  const html = <Html {...props} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

if (publicPath.match(/^\//)) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.use(async (req, res, next) => {
  const api = apiService.create();
  /* @fonz This could be made  less amateurish */
  const sly_uuid_c = req.cookies.sly_uuid;
  let sly_uuid = null;
  let set_uuid = false;
  if (sly_uuid_c === undefined) {
    sly_uuid = v4();
    set_uuid = true;
  }
  let sly_sid = req.cookies.sly_sid;
  if (sly_sid === undefined) {
    sly_sid = require('crypto').randomBytes(16).toString('hex');
  }
  res.header('Set-Cookie',[`sly_uuid=${sly_uuid};Max-Age=27000000;Domain=${cookieDomain};Path=/;`, `sly_sid=${sly_sid};Max-Age=3600;Domain=${cookieDomain};Path=/;`]);
  res.header('Cache-Control', ['max-age=0, private, must-revalidate', 'no-cache="set-cookie"']);

  if (req.headers.cookie) {
    api.setCookie(req.headers.cookie);
  } else if (set_uuid){
    api.setCookie(`sly_uuid=${sly_uuid}`);
  }
  /* End of possible temp code */

  const location = req.url;
  const store = configureStore({}, { api });
  const sheet = new ServerStyleSheet();
  const context = {};

  try {
    const { state: serverState, html: content } = await renderApp({
      store,
      context,
      location,
      sheet,
    });

    if (serverState) {
      Object.values(serverState).forEach(val => {
        if (val && val.stack) {
          throw val;
        }
      });
    }

    if (context.status) {
      res.status(context.status);
    }

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      const { assets } = global;
      const initialState = store.getState();
      res.send(renderHtml({
        serverState,
        initialState,
        content,
        sheet,
        assets,
      }));
    }
  } catch (error) {
    next(error);
  }
});

const getErrorContent = (err) => {


  if (isDev) {
    const Redbox = require('redbox-react').RedBoxError;
    return <Redbox error={err} />;
  } else {
    return <Error />;
  }
};

app.use((err, req, res, next) => {
  const sheet = new ServerStyleSheet();
  try {
    const errorContent = getErrorContent(err);
    const content = renderToStaticMarkup(sheet.collectStyles(errorContent));
    const assets = {
      ...global.assets,
      js: [],
    };
    res.status(500).send(renderHtml({ content, sheet, assets }));
    next(err);
  } catch (otherError) {
    next(otherError);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    const json = JSON.stringify(serializeError(err));
    console.error(`${new Date().toISOString()} ${json}`);
  }
});

app.listen(port, (error) => {
  const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is running at ${boldBlue(`http://${host}:${port}${basename}`)}`);
  }
});

