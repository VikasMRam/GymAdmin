/* eslint-disable no-console */
import 'babel-polyfill';
import path from 'path';
import crypto from 'crypto';

import parseUrl from 'parseurl';
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
import pathToRegexp from 'path-to-regexp';
import cloneDeep from 'lodash/cloneDeep';

import { cleanError, logWarn } from 'sly/services/helpers/logging';
import { removeQueryParamFromURL } from 'sly/services/helpers/url';
import { port, host, publicPath, isDev, cookieDomain } from 'sly/config';
import { configure as configureStore } from 'sly/store';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import apiService from 'sly/services/api';
import ClientApp from 'sly/components/App';
import DashboardApp from 'sly/components/DashboardApp';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';
import { createApi as createBeesApi } from 'sly/services/newApi';
import ApiProvider, { makeApiCall } from 'sly/services/newApi/ApiProvider';

const makeAppRenderer = renderedApp => ({
  store, context, location, sheet,
}) => {
  const app = sheet.collectStyles((
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        {renderedApp}
      </StaticRouter>
    </Provider>
  ));
  return renderToString(app);
};

const renderEmptyApp = () => {
  return { html: '', state: {} };
};

// requires compatible configuration
const getAppRenderer = ({ bundle, api }) => {
  switch (bundle) {
    case 'dashboard': return makeAppRenderer((
      <ApiProvider api={api}>
        <DashboardApp />
      </ApiProvider>
    ));
    case 'client': return makeAppRenderer((
      <ApiProvider api={api}>
        <ClientApp />
      </ApiProvider>
    ));
    default: return renderEmptyApp;
  }
};

const getErrorContent = (err) => {
  if (isDev) {
    const Redbox = require('redbox-react').RedBoxError;
    return <Redbox error={err} />;
  }
  return <Error />;
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

const createSetCookie = (res, cookies) => (key, value, maxAge = 27000000) => {
  res.cookie(key, value, { domain: cookieDomain, maxAge });
  cookies.push(`${key}=${value}`);
};

const makeSid = () => crypto.randomBytes(16).toString('hex');

const clientConfigsMiddleware = (configs) => {
  configs.forEach((config) => {
    config.regexp = pathToRegexp(config.path);
  });
  return (req, res, next) => {
    const path = parseUrl(req).pathname;
    for (const config of configs) {
      if (path.match(config.regexp)) {
        // we are going to modify this object in subsequent middlewares
        req.clientConfig = cloneDeep(config);
        break;
      }
    }
    next();
  };
};

const app = express();

app.disable('x-powered-by');
app.use(cookieParser());

if (publicPath.match(/^\//)) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

// global.clientConfigs is injected by plugins in private/webpack
app.use(clientConfigsMiddleware(global.clientConfigs));

// non ssr apps
app.use((req, res, next) => {
  const { ssr, assets, bundle } = req.clientConfig;
  if (!ssr) {
    const renderApp = getAppRenderer(bundle);
    const { html: content } = renderApp();
    res.send(renderHtml({
      content,
      assets,
    }));
  } else {
    next();
  }
});

// headers
app.use((req, res, next) => {
  const cookies = [req.headers.cookie];
  const setCookie = createSetCookie(res, cookies);
  req.clientConfig.cookies = cookies;

  if (req.query.sly_uuid) {
    if (!req.cookies.sly_uuid) {
      setCookie('sly_uuid', req.query.sly_uuid);
    }
    const newUrl = removeQueryParamFromURL('sly_uuid', req.url);
    res.redirect(newUrl);
    return;
  }

  let slyUUID = req.cookies.sly_uuid;
  if (!slyUUID) {
    slyUUID = v4();
    setCookie('sly_uuid', slyUUID);
  }

  req.clientConfig.slyUUID = slyUUID;

  const slySID = req.cookies.sly_sid || makeSid();

  if (!req.cookies.sly_sid) {
    setCookie('sly_sid', slySID, 3600);
  }

  if (!req.cookies.referrer && req.headers.referer) {
    setCookie('referrer', req.headers.referer);
  }

  const utmStr = [
    'utm_content',
    'utm_medium',
    'utm_source',
    'utm_campaign',
    'utm_term',
  ].reduce((cumul, key) => {
    if (req.query[key]) {
      cumul.push(`${key}:${req.query[key]}`);
    }
    return cumul;
  }, [])
    .join(',');

  if (!req.cookies.utm && utmStr) {
    setCookie('utm', utmStr);
  }

  res.header('Cache-Control', [
    'max-age=0, private, must-revalidate',
    'no-cache="set-cookie"',
  ]);

  next();
});

// store
app.use(async (req, res, next) => {
  const { slyUUID, cookies } = req.clientConfig;

  const hmac = crypto.createHmac('sha256', slyUUID);
  const slyUUIDHash = hmac.digest('hex');
  const experimentNames = Object.keys(experiments);
  const userExperiments = experimentNames
    .reduce((cumul, key, i) => {
      const channel = i % 8;
      const part = slyUUIDHash.substr(channel * 4, 4);
      const segment = Math.floor((parseInt(part, 16) / 65536) / (1 / experiments[key].length));
      const variant = experiments[key][segment];
      const modifiedCumul = { ...cumul };
      modifiedCumul[key] = variant;
      return modifiedCumul;
    }, {});

  const api = apiService.create();

  api.setHeader('cookie', cookies.join('; '));
  api.setHeader('user-agent', req.headers['user-agent']);
  api.setHeader('x-is-sly-ssr', 'true');
  api.setHeader(
    'x-forwarded-for',
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  );

  const beesApi = createBeesApi({
    configureHeaders: headers => ({
      ...headers,
      Cookie: cookies.join('; '),
      'User-Agent': req.headers['user-agent'],
      'X-is-sly-ssr': 'true',
      'X-forwarded-for': req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    }),
  });

  const store = configureStore({ experiments: userExperiments }, { api });

  try {
    await store.dispatch(resourceDetailReadRequest('user', 'me'));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      // ignore 401
      logWarn(e);
    } else {
      console.log('old user/me error', e);
      next(e);
      return;
    }
  }

  const ignoreUnauthorized = (e) => {
    if (e.status === 401) {
      // ignore 401
      logWarn(e);
    } else {
      return Promise.reject(e);
    }
    return null;
  };

  try {
    await store.dispatch(makeApiCall(beesApi.getUser, [{ id: 'me' }])).catch(ignoreUnauthorized);
  } catch (e) {
    e.message = `Error trying to prefetch user data: ${e.message}`;
    console.log('new user/me error', e);
    next(e);
    return;
  }

  req.clientConfig.store = store;
  req.clientConfig.api = beesApi;

  next();
});

// render
app.use(async (req, res, next) => {
  const { assets, store } = req.clientConfig;
  const sheet = new ServerStyleSheet();
  const context = {};
  const renderApp = getAppRenderer(req.clientConfig);

  try {
    const { state: serverState, html: content } = await renderApp({
      store,
      context,
      location: req.url,
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

// render error
app.use((err, req, res, next) => {
  const sheet = new ServerStyleSheet();
  const errorContent = getErrorContent(err);
  const content = renderToStaticMarkup(sheet.collectStyles(errorContent));
  const assets = { css: [], js: [] };
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
