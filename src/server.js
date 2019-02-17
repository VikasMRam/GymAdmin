/* eslint-disable no-console */
import 'babel-polyfill';

import path from 'path';
import crypto from 'crypto';

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

import { cleanError, logWarn } from 'sly/services/helpers/logging';
import { removeQueryParamFromURL } from 'sly/services/helpers/url';
import { port, host, basename, publicPath, isDev, cookieDomain, externalWizardsPath } from 'sly/config';
import { configure as configureStore } from 'sly/store';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import apiService from 'sly/services/api';
import App from 'sly/components/App';
import Html from 'sly/components/Html';
import Error from 'sly/components/Error';

const utmParams = [
  'utm_content',
  'utm_medium',
  'utm_source',
  'utm_campaign',
  'utm_term',
];

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

const createSetCookie = (res, cookies) => (key, value, maxAge = 27000000) => {
  res.cookie(key, value, { domain: cookieDomain, maxAge });
  cookies.push(`${key}=${value}`);
};

const makeSid = () => crypto.randomBytes(16).toString('hex');

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

if (publicPath.match(/^\//)) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.get(`${externalWizardsPath}*`, (req, res) => {
  const content = '';
  const { externalAssets } = global;
  return res.send(renderHtml({
    content,
    assets: externalAssets,
  }));
});

app.use(async (req, res, next) => {
  const api = apiService.create();

  const cookies = [req.headers.cookie];
  const setCookie = createSetCookie(res, cookies);

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

  const slySID = req.cookies.sly_sid || makeSid();

  if (!req.cookies.sly_sid) {
    setCookie('sly_sid', slySID, 3600);
  }

  if (!req.cookies.referrer && req.headers.referer) {
    setCookie('referrer', req.headers.referer);
  }

  const utmStr = utmParams.reduce((cumul, key) => {
    if (req.query[key]) {
      cumul.push(`${key}:${req.query[key]}`);
    }
    return cumul;
  }, []).join(',');

  if (!req.cookies.utm && utmStr) {
    setCookie('utm', utmStr);
  }

  res.header('Cache-Control', [
    'max-age=0, private, must-revalidate',
    'no-cache="set-cookie"',
  ]);

  api.setHeader('cookie', cookies.join('; '));
  api.setHeader('user-agent', req.headers['user-agent']);
  api.setHeader('x-is-sly-ssr', 'true');
  api.setHeader(
    'x-forwarded-for',
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  );

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

  const store = configureStore({ experiments: userExperiments }, { api });
  const sheet = new ServerStyleSheet();
  const context = {};

  // FIXME: @amalseniorly I'm hacking this on here for now, this adds some 20 ms to the
  // response but fixes the race condition in forAuthenticated, once we tackle
  // forAuthenticated to react to log in changes and to resume in client after starting
  // in server, we can fix this too. Fonz
  try {
    await store.dispatch(resourceDetailReadRequest('user', 'me'));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      // ignore 401
      logWarn(e);
    } else {
      next(e);
      return;
    }
  }

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
    console.log('context', context);

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
    console.info(`Server is running at ${boldBlue(`${host}:${port}${basename}`)}`);
  }
});

