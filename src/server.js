/* eslint-disable no-console */
import '@babel/polyfill';
import 'isomorphic-fetch';

import path from 'path';
import fs from 'fs';

import express from 'express';
import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { renderStylesToString } from 'emotion-server';
import debounce from 'lodash/debounce';

import { cleanError } from 'sly/services/helpers/logging';
import { port, host, publicPath, isDev } from 'sly/config';
import { configure as configureStore } from 'sly/store';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';
import clientConfigsMiddleware from 'sly/clientConfigs';

const waitForFile = (path, timeout = 100, max = 10) => new Promise((resolve, reject) => {
  let counter = 0;
  const interval = setInterval(() => {
    if (fs.existsSync(path)) {
      clearInterval(interval);
      resolve(path);
    } else {
      counter++;
      if (counter >= max) {
        reject(new Error(`file: ${path} not found`));
      }
    }
  }, timeout);
});

const requireJson = (file) => {
  let json = {};
  try {
    const data = fs.readFileSync(file);
    json = JSON.parse(data);
  } catch (e) {
    console.error(e);
  }
  return json;
};

const getStats = (() => {
  const statsNodeFile = path.resolve(process.cwd(), 'dist/loadable-stats-node.json');
  const statsWebFile = path.resolve(process.cwd(), 'dist/loadable-stats-web.json');

  let statsNode;
  let statsWeb;

  const patchStats = () => {
    statsNode = requireJson(statsNodeFile);
    statsWeb = requireJson(statsWebFile);
  };

  if (!isDev) {
    // stats files are ready from build step
    patchStats();
  } else {
    // stats files might be compiling and might change during development
    const debouncedPatchConfig = debounce(
      patchStats,
      100,
    );
    const files = [statsNodeFile, statsWebFile];
    Promise.all(files.map(waitForFile))
      .then(() => {
        debouncedPatchConfig();
        files.forEach((file) => {
          fs.watch(file, { persistent: false }, debouncedPatchConfig);
        });
      })
      // eslint-disable-next-line
      .catch(console.error);
  }

  return () => ({
    statsNode,
    statsWeb,
  });
})();

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

app.use(clientConfigsMiddleware());

// non ssr apps
app.use((req, res, next) => {
  const { ssr, bundle } = req.clientConfig;

  if (!ssr) {
    const { statsWeb } = getStats();
    const extractor = new ChunkExtractor({ stats: statsWeb, entrypoints: [bundle] });

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
  const { bundle } = req.clientConfig;

  try {
    const { statsNode, statsWeb } = getStats();

    const extractor = new ChunkExtractor({ stats: statsWeb, entrypoints: [bundle] });
    const extractorSsr = new ChunkExtractor({ stats: statsNode, entrypoints: [bundle] });
    const { default: ClientApp, renderToString } = extractorSsr.requireEntrypoint();

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
        'max-age=0, private, must-revalidate',
        'no-cache="set-cookie"',
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
