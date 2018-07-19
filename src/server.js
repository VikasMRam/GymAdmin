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

import { port, host, basename, publicPath, isDev, cookieDomain, externalWizardsPath } from 'sly/config';
import configureStore from 'sly/store/configure';
import apiService from 'sly/services/api';
import App from 'sly/components/App';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';

const renderApp = ({
  store, context, location, sheet,
}) => {
  const app = sheet.collectStyles((
    <Provider store={store}>
      <StaticRouter basename={basename} context={context} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  ));
  return renderToString(app);
};

const renderHtml = ({
  serverState, initialState, content, sheet, assets,
}) => {
  const styles = sheet ? sheet.getStyleElement() : '';

  const state = `
    ${serverState ? `window.__SERVER_STATE__ = ${serialize(serverState)};` : ''}
    ${initialState ? `window.__INITIAL_STATE__ = ${serialize(initialState)};` : ''}
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

const experiments = require('sly/../experiments.json');

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

if (publicPath.match(/^\//)) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.get(`${externalWizardsPath}*`, (req, res) => {
  const content = '';
  const assets = {
    js: [
      path.join(publicPath, 'external/wizards.js'),
    ],
    css: [],
  };
  return res.send(renderHtml({
    content,
    assets,
  }));
});

app.use(async (req, res, next) => {
  const api = apiService.create();
  const cookieArr = [];
  let slyUUID = req.cookies.sly_uuid;
  let setUUID = false;
  if (slyUUID === undefined || slyUUID === null) {
    slyUUID = v4();
    setUUID = true;
  }
  cookieArr.push(`sly_uuid=${slyUUID};Max-Age=27000000;Domain=${cookieDomain};Path=/;`);

  let slySID = req.cookies.sly_sid;
  if (slySID === undefined || slySID === null) {
    slySID = require('crypto').randomBytes(16).toString('hex');
  }
  cookieArr.push(`sly_sid=${slySID};Max-Age=3600;Domain=${cookieDomain};Path=/;`);


  let slyReferrer = req.cookies.referrer;
  if (slyReferrer === undefined || slyReferrer === null) {
    slyReferrer = req.headers.referer;
    cookieArr.push(`referrer=${slyReferrer};Max-Age=27000000;Domain=${cookieDomain};Path=/;`);
  }

  const utmParams = ['utm_content', 'utm_medium', 'utm_source', 'utm_campaign', 'utm_term'];
  const utm = req.cookies.utm;
  if (utm === undefined || utm === null) {
    let utmStr = '';
    utmParams.forEach((elem) => {
      if (req.query[elem] !== undefined) {
        if (utmStr !== '') {
          utmStr += ',';
        }
        utmStr = `${utmStr + elem}=${req.query[elem]}`;
      }
    });
    if (utmStr !== '') {
      cookieArr.push(`referrer=${utmStr};Max-Age=27000000;Domain=${cookieDomain};Path=/;`);
    }
  }

  res.header('Set-Cookie', cookieArr);
  res.header('Cache-Control', ['max-age=0, private, must-revalidate', 'no-cache="set-cookie"']);

  if (req.headers.cookie) {
    api.setCookie(req.headers.cookie);
  } else if (setUUID) {
    api.setCookie(`sly_uuid=${slyUUID}`);
  }
  /* End of possible temp code */

  const location = req.url;
  const experimentNames = Object.keys(experiments);
  const userExperiments = experimentNames
    .reduce((cumul, key, i) => {
      const channel = i % 8;
      const part = slySID.substr(channel * 4, 4);
      const segment = Math.floor((parseInt(part, 16) / 65536) / (1 / experiments[key].length));
      const variant = experiments[key][segment];
      const modifiedCumul = { ...cumul };
      modifiedCumul[key] = variant;
      return modifiedCumul;
    }, {});

  const store = configureStore({ experiments: userExperiments }, { api });
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
      Object.values(serverState).forEach((val) => {
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
  }
  return <Error />;
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
    const errorObj = {
      url: req.originalUrl,
      error: serializeError(err),
    };
    const json = JSON.stringify(errorObj);
    console.error(`${new Date().toISOString()} ${json}`);
  }
});

app.listen(port, (error) => {
  const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is running at ${boldBlue(`${host}:${port}${basename}`)}`);
  }
});

