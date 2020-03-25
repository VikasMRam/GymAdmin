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
import cookieParser from 'cookie-parser';
import { ChunkExtractor } from '@loadable/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { renderStylesToString } from 'emotion-server';

import { cleanError } from 'sly/services/helpers/logging';
import { port, host, publicPath, isDev, domain, disableExperiments } from 'sly/config';
import { configure as configureStore } from 'sly/store';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';
import { clientConfigsMiddleware } from 'sly/clientConfigs';

const statsNode = path.resolve(process.cwd(), 'dist/loadable-stats-node.json');
const statsWeb = path.resolve(process.cwd(), 'dist/loadable-stats-web.json');

const getErrorContent = (err) => {
  if (isDev) {
    const Redbox = require('redbox-react').RedBoxError;
    return <Redbox error={err} />;
  }
  return <Error />;
};

const renderHtml = ({
  initialState, content, sheet, extractorWeb,
}) => {
  const linkElements = extractorWeb && extractorWeb.getLinkElements();
  const styleElements = sheet && sheet.getStyleElement();
  const scriptElements = extractorWeb && extractorWeb.getScriptElements();

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
app.use(cookieParser());

if (!isDev) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.use(clientConfigsMiddleware());

// non ssr apps
app.use((req, res, next) => {
  const { ssr, bundle } = req.clientConfig;
  if (!ssr) {
    const extractorWeb = new ChunkExtractor({
      entrypoints: [bundle],
      statsFile: statsWeb,
    });
    res.send(renderHtml({
      content: '',
      extractorWeb,
    }));
  } else {
    next();
  }
});

// headers
app.use((req, res, next) => {
  // const apiCookies = req.headers.cookie ? [req.headers.cookie] : [];
  // const setCookie = createSetCookie(res, apiCookies);
  // req.clientConfig.apiCookies = apiCookies;
  //
  // if (req.query.sly_uuid) {
  //   if (!req.cookies.sly_uuid) {
  //     setCookie('sly_uuid', req.query.sly_uuid);
  //   }
  //   const newUrl = removeQueryParamFromURL('sly_uuid', req.url);
  //   res.redirect(newUrl);
  //   return;
  // }
  //
  // let slyUUID = req.cookies.sly_uuid;
  // if (!slyUUID) {
  //   slyUUID = v4();
  //   setCookie('sly_uuid', slyUUID);
  // }
  //
  // req.clientConfig.slyUUID = slyUUID;
  //
  // const slySID = req.cookies.sly_sid || makeSid();
  //
  // if (!req.cookies.sly_sid) {
  //   setCookie('sly_sid', slySID);
  // }
  //
  // if (!req.cookies.referrer && req.headers.referer) {
  //   setCookie('referrer', req.headers.referer);
  // }
  //
  // const utmStr = [
  //   'utm_content',
  //   'utm_medium',
  //   'utm_source',
  //   'utm_campaign',
  //   'utm_term',
  // ].reduce((cumul, key) => {
  //   if (req.query[key]) {
  //     cumul.push(`${key}:${req.query[key]}`);
  //   }
  //   return cumul;
  // }, [])
  //   .join(',');
  //
  // if (!req.cookies.utm && utmStr) {
  //   setCookie('utm', utmStr);
  // }

  res.header('Cache-Control', [
    'max-age=0, private, must-revalidate',
    'no-cache="set-cookie"',
  ]);

  next();
});

// store
app.use(async (req, res, next) => {
  // const { slyUUID, apiCookies } = req.clientConfig;
  //
  // const hmac = crypto.createHmac('sha256', slyUUID);
  // const slyUUIDHash = hmac.digest('hex');
  // const userExperiments = Object.keys(experiments)
  //   .reduce((cumul, key, i) => {
  //     let segment;
  //     if (disableExperiments) {
  //       segment = 0;
  //     } else {
  //       const channel = i % 8;
  //       const part = slyUUIDHash.substr(channel * 4, 4);
  //       segment = Math.floor((parseInt(part, 16) / 65536) / (1 / experiments[key].length));
  //     }
  //     const variant = experiments[key][segment];
  //     cumul[key] = variant;
  //     return cumul;
  //   }, {});
  //
  // const apiConfig = {
  //   headers: {
  //     Cookie: apiCookies.join('; '),
  //     'User-Agent': req.headers['user-agent'],
  //     'X-is-sly-ssr': 'true',
  //     'X-forwarded-for': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  //   },
  // };

  const store = configureStore({ experiments: {} });

  // prefetch user data
  req.clientConfig.store = store;
  // req.clientConfig.apiConfig = apiConfig;

  next();
});

// render
app.use(async (req, res, next) => {
  const { store, apiConfig, bundle } = req.clientConfig;

  try {
    const extractorNode = new ChunkExtractor({ statsFile: statsNode, entrypoints: [bundle] });
    const { default: ClientApp, renderToString } = extractorNode.requireEntrypoint();

    const extractorWeb = new ChunkExtractor({ statsFile: statsWeb, entrypoints: [bundle] });

    const sheet = new ServerStyleSheet();
    const context = {};

    const app = sheet.collectStyles(extractorWeb.collectChunks((
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
      res.send(renderHtml({
        initialState,
        content,
        sheet,
        extractorWeb,
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
