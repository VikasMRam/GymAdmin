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

import { port, host, basename, publicPath } from 'sly/config';
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

if (publicPath.match(/^\//)) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.use((req, res, next) => {
  const api = apiService.create();
  if (req.headers.cookie) {
    api.setCookie(req.headers.cookie);
  }

  const location = req.url;
  const store = configureStore({}, { api });
  const sheet = new ServerStyleSheet();
  const context = {};

  renderApp({
    store,
    context,
    location,
    sheet,
  })
    .then(({ state: serverState, html: content }) => {
      if (serverState) {
        Object.values(serverState).forEach(val => {
          if (val && val.stack) {
            console.error('There was an unhandled error');
            throw val;
          }
        });
      }

      if (context.status) {
        res.status(context.status);
      }

      if (context.url) {
        res.redirect(context.url);
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
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  const sheet = new ServerStyleSheet();
  const content = renderToStaticMarkup(sheet.collectStyles(<Error />));
  const assets = {
    ...global.assets,
    js: [],
  };
  res.status(500).send(renderHtml({ content, sheet, assets }));
  console.error(err);
  next(err);
});

app.listen(port, (error) => {
  const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is running at ${boldBlue(`http://${host}:${port}${basename}`)}`);
  }
});

