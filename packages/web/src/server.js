/* eslint-disable camelcase */
/* eslint-disable no-console */
import path from 'path';

import 'isomorphic-fetch';
import express from 'express';
import React from 'react';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { renderStylesToString } from 'emotion-server';
import builder from 'xmlbuilder';
import ConvertAnsi from 'ansi-to-html';
import { stringify } from 'query-string';

import { cleanError } from 'sly/web/services/helpers/logging';
import { port, host, publicPath, isDev, cmsUrl, apiUrl } from 'sly/web/config';
import { configure as configureStore } from 'sly/web/store';
import Html from 'sly/web/components/Html';
import ErrorComponent from 'sly/web/components/Error';
import { clientConfigsMiddleware, clientDevMiddleware } from 'sly/web/clientConfigs';
import renderAndPrefetch from 'sly/web/services/api/renderAndPrefetch';
import endpoints from 'sly/web/services/api/endpoints';
import { RESOURCE_CENTER_PATH } from 'sly/web/dashboard/dashboardAppPaths';
import { createApiClient } from 'sly/web/services/api';

const convertAnsi = new ConvertAnsi();
const getErrorContent = (err) => {
  if (isDev) {
    const Redbox = require('redbox-react').RedBoxError;
    return <Redbox error={err} />;
  }
  return <ErrorComponent />;
};

const renderHtml = ({
  initialState, apiState, content, sheet, extractor, iconsContext,
}) => {
  const linkElements = (extractor && extractor.getLinkElements()) || [];
  const scriptElements = (extractor && extractor.getScriptElements()) || [];
  const styleElements = (sheet && sheet.getStyleElement()) || [];

  const state = `
    ${initialState ? `window.__INITIAL_STATE__ = ${serialize(initialState)};` : ''}
    ${apiState ? `window.__API_STATE__ = ${serialize(apiState)};` : ''}
  `;

  const props = {
    state,
    content,
    linkElements,
    styleElements,
    scriptElements,
    iconsContext,
  };
  const html = <Html {...props} />;
  return `<!doctype html>\n${renderToStaticMarkup(html)}`;
};

const app = express();

const getResourceCenterSitemapXML = (req, res) => {
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  };

  fetch(`${cmsUrl}${endpoints.getTopic.path}`, options)
    .then(res => res.json())
    .then((topics) => {
      fetch(`${cmsUrl}${endpoints.getArticlesForSitemap.path}`, options)
        .then(res => console.log('First then') || res.json())
        .then((data) => {
          const root = builder.create('urlset', {
            version: '1.0',
            encoding: 'UTF-8',
          });
          root.att({ xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
          const resourcesHomePageUrl = root.ele('url');
          resourcesHomePageUrl.ele('loc', `${host}${RESOURCE_CENTER_PATH}`);
          resourcesHomePageUrl.ele('priority', 0.9);
          topics.forEach(({ slug }) => {
            const url = root.ele('url');
            url.ele('loc', `${host}${RESOURCE_CENTER_PATH}/${slug}`);
            url.ele('priority', 0.9);
          });
          Array.isArray(data) && data.forEach(({ slug, updated_at: updatedAt, mainTopic }) => {
            const url = root.ele('url');
            url.ele('loc', `${host}${RESOURCE_CENTER_PATH}/${mainTopic.slug}/${slug}`);
            url.ele('lastmod', updatedAt);
            url.ele('priority', 0.9);
          });
          res.end(root.end({ pretty: true }));
        })
        .catch(() => res.status(500).send({ title: 'There are some issues on server, please try again' }));
    })
    .catch(() => res.status(500).send({ title: 'There are some issues on server, please try again' }));
};

app.all('/authorize', (req, res) => {
  fetch(`${apiUrl}${req.url}`)
    .then((res) => {
      console.log(res.status);
      if (res.status !== 200) {
        let param = 'expired';
        if (res.status !== 401) {
          param = 'error';
        }
        throw new Error(param);
      }
      // eslint-disable-next-line no-underscore-dangle
      return { cookies: res.headers._headers['set-cookie'] };
    })
    .then(({ cookies }) => {
      console.log('then');
      let { redirect_to = '/' } = req.query;
      if (!redirect_to || redirect_to === 'undefined') {
        redirect_to = '/';
      }
      res.setHeader('set-cookie', cookies);
      res.redirect(301, redirect_to);
    }).catch((err) => {
      const { message: status } = err;
      const { redirect_to } = req.query;
      res.redirect(301,  `/?${stringify({ loginRedirect: redirect_to, status })}`);
    });
});


app.get('/sitemap/resource-center.xml', getResourceCenterSitemapXML);

app.disable('x-powered-by');

if (isDev) {
  app.use(publicPath, express.static(path.resolve(process.cwd(), 'public')));
  app.use(clientDevMiddleware());
}

app.use(publicPath, express.static(path.resolve(process.cwd(), 'dist/public')));

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
  const {
    extractor,
    ClientApp,
  } = req.clientConfig;

  try {
    const sheet = new ServerStyleSheet();
    const context = {};
    const apiContext = {
      apiClient: createApiClient(),
      skipApiCalls: false,
    };
    const iconsContext = {};
    const store = configureStore({ experiments: {} }, { apiStore: apiContext.apiClient.store });

    const app = sheet.collectStyles(extractor.collectChunks((
      <StaticRouter context={context} location={req.url}>
        <ClientApp
          apiContext={apiContext}
          iconsContext={iconsContext}
          reduxStore={store}
        />
      </StaticRouter>
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
      const apiState = apiContext.apiClient.store.getState();
      res.header('Cache-Control', [
        'max-age=0, private, must-revalidate',
        'no-cache="set-cookie"',
      ]);

      res.send(renderHtml({
        initialState,
        apiState,
        content,
        sheet,
        extractor,
        iconsContext,
      }));
    }
  } catch (error) {
    next(error);
  }
});

// render error
app.use((err, req, res, next) => {
  const sheet = new ServerStyleSheet();
  const htmlError = new Error();
  // eslint-disable-next-line no-restricted-syntax, guard-for-in, vars-on-top
  for (const k in err) htmlError[k] = err[k];
  htmlError.message = (
    <pre
      style={{ background: 'pink' }}
      dangerouslySetInnerHTML={{ __html: convertAnsi.toHtml(err.message) }}
    />
  );
  const errorContent = getErrorContent(htmlError);
  const content = renderToStaticMarkup(sheet.collectStyles(errorContent));
  const assets = [];
  res.status(500).send(renderHtml({ content, sheet, assets }));
  next(err);
});

// error log
app.use((err, req, res, next) => {
  if (err) {
    if (!isDev) {
      const errorObj = {
        ts: new Date().toISOString(),
        status: res.statusCode,
        url: req.originalUrl,
        error: cleanError(err),
      };
      console.error(errorObj);
    } else {
      err.message = `${res.statusCode} ${req.originalUrl} ${err.message}`;
      console.error(err);
    }
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
