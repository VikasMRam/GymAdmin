/* eslint-disable no-console */
import '@babel/polyfill';
import path from 'path';
import 'isomorphic-fetch';

import express from 'express';
import React from 'react';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { renderStylesToString } from 'emotion-server';

import { cleanError } from 'sly/services/helpers/logging';
import { port, host, publicPath, isDev } from 'sly/config';
import { configure as configureStore } from 'sly/store';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';
import clientConfigsMiddleware from 'sly/clientConfigs';

const statsNode = path.resolve(process.cwd(), 'dist/loadable-stats-node.json');
const statsWeb = path.resolve(process.cwd(), 'dist/loadable-stats-web.json');

const sheet = new ServerStyleSheet();

const getErrorContent = (err) => {
  if (isDev) {
    const Redbox = require('redbox-react').RedBoxError;
    return <Redbox error={err} />;
  }
  return <Error />;
};

const renderHtml = ({
  initialState, content, sheet, extractor,
}) => {
  const linkElements = extractor && extractor.getLinkElements();
  const styleElements = sheet && sheet.getStyleElement();
  const scriptElements = extractor && extractor.getScriptElements();

  const state = `
    ${initialState ? `window.__INITIAL_STATE__ = ${serialize(initialState)};` : ''}
  `;

  const props = {
    state,
    content,
    linkElements,
    styleElements,
    scriptElements,
  };
  const html = <Html {...props} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};

const app = express();

app.disable('x-powered-by');

if (!isDev) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.use(clientConfigsMiddleware({ statsNode, statsWeb }));

// non ssr apps
app.use((req, res, next) => {
  const { ssr, extractor } = req.clientConfig;
  if (!ssr) {
    res.send(renderHtml({
      content: '',
      extractor,
    }));
  } else {
    next();
  }
});

// render
app.use(async (req, res, next) => {
  const store = configureStore({ experiments: {} });
  const {
    renderToString,
    extractor,
    ClientApp,
  } = req.clientConfig;

  // hack to reset chunk count in the extractor
  extractor.chunks = [];

  try {
    const context = {};

    const app = sheet.collectStyles(extractor.collectChunks((
      <CacheProvider value={cache}>
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <ClientApp />
          </StaticRouter>
        </Provider>
      </CacheProvider>
    )));

    const result = await renderToString(app);
    const content = renderStylesToString(result);

    if (context.status) {
      res.status(context.status);
    }

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      const initialState = store.getState();
      res.header('Cache-Control', [
        'max-age=86400, public',
      ]);

      res.send(renderHtml({
        initialState,
        content,
        sheet,
        extractor,
      }));
    }
  } catch (error) {
    next(error);
  }
});

// render error
app.use((err, req, res, next) => {
  const sheet = new ServerStyleSheet();
  const errorContent = getErrorContent(err);
  const content = renderToStaticMarkup(sheet.collectStyles(errorContent));
  const assets = [];
  res.status(500).send(renderHtml({ content, sheet, assets }));
  next(err);
});

// error log
app.use((err, req, res, next) => {
  if (err) {
    const errorObj = {
      ts: new Date().toISOString(),
      status: res.statusCode,
      url: req.originalUrl,
      error: cleanError(err),
    };
    console.error(errorObj);
  }
  next();
});

app.listen(port, (error) => {
  const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`;
  if (error) {
    console.error(error);
  } else {
    console.info(`Server is running at ${boldBlue(`${host}:${port}`)}`);
  }
});
