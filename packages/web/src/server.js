/* eslint-disable no-console */
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
import request from 'request';
import builder from 'xmlbuilder';

import { cleanError } from 'sly/web/services/helpers/logging';
import { port, host, publicPath, isDev, mailchimpApiKey, mailchimpListId, mailchimpDataCenter, cmsUrl } from 'sly/web/config';
import { configure as configureStore } from 'sly/web/store';
import Html from 'sly/web/components/Html';
import Error from 'sly/web/components/Error';
import { clientConfigsMiddleware, clientDevMiddleware } from 'sly/web/clientConfigs';
import renderAndPrefetch from 'sly/web/services/api/renderAndPrefetch';
import { urlize } from 'sly/web/services/helpers/url';
import endpoints from 'sly/web/services/api/endpoints';
import { RESOURCE_CENTER_PATH } from 'sly/web/constants/dashboardAppPaths';
import { topics } from 'sly/web/components/resourceCenter/helper';

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
  const linkElements = (extractor && extractor.getLinkElements()) || [];
  const styleElements = (sheet && sheet.getStyleElement()) || [];
  const scriptElements = (extractor && extractor.getScriptElements()) || [];

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

const subscribe = (req, res) => {
  const { email } = req.body;
  const options = {
    url: `https://${mailchimpDataCenter}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`,
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `apikey ${mailchimpApiKey}` },
    body: JSON.stringify({ email_address: email, status: 'subscribed' }),
  };
  request(options, (error, response) => {
    if (response) {
      if (response.statusCode === 200) {
        res.status(response.statusCode).send({ title: 'Subscribed' });
      } else {
        res.status(response.statusCode).send({ title: JSON.parse(response && response.body).title });
      }
    }
    if (error) res.status(500).send({ title: 'There are some issues on server, please try again' });
  });
};

const getResourceCenterSitemapXML = (req, res) => {
  const options = {
    url: `${cmsUrl}${endpoints.getArticlesForSitemap.path}`,
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };
  request(options, (error, response) => {
    if (response) {
      const root = builder.create('urlset', {
        version: '1.0',
        encoding: 'UTF-8',
      });
      root.att({ xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
      const resourcesHomePageUrl = root.ele('url');
      resourcesHomePageUrl.ele('loc', `${host}${RESOURCE_CENTER_PATH}`);
      resourcesHomePageUrl.ele('priority', 0.9);
      topics.forEach(({ to }) => {
        const url = root.ele('url');
        url.ele('loc', `${host}${to}`);
        url.ele('priority', 0.9);
      });
      Array.isArray(response.body) && JSON.parse(response.body).forEach(({ slug, updated_at: updatedAt, topic }) => {
        const url = root.ele('url');
        url.ele('loc', `${host}${RESOURCE_CENTER_PATH}/${urlize(topic)}/${slug}`);
        url.ele('lastmod', updatedAt);
        url.ele('priority', 0.9);
      });
      res.end(root.end({ pretty: true }));
    }
    if (error) res.status(500).send({ title: 'There are some issues on server, please try again' });
  });
};

app.use(express.json());
app.post('/subscribe-mailchimp', subscribe);
app.get('/sitemap/resource-center.xml', getResourceCenterSitemapXML);

app.disable('x-powered-by');

if (isDev) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'public')));
  app.use(clientDevMiddleware());
} else {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));
}

app.use(clientConfigsMiddleware());

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
    extractor,
    ClientApp,
  } = req.clientConfig;

  try {
    const sheet = new ServerStyleSheet();
    const context = {};
    const apiContext = { promises: [] };

    const app = sheet.collectStyles(extractor.collectChunks((
      <CacheProvider value={cache}>
        <Provider store={store}>
          <StaticRouter context={context} location={req.url}>
            <ClientApp apiContext={apiContext} />
          </StaticRouter>
        </Provider>
      </CacheProvider>
    )));

    const result = await renderAndPrefetch(app, apiContext);
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
