import fs from 'fs';
import path from 'path';

import parseUrl from 'parseurl';
import pathToRegexp from 'path-to-regexp';
import { ChunkExtractor } from '@loadable/server';

import { isDev, publicPath } from 'sly/web/config';


// eslint-disable-next-line no-console
const info = message => console.info(`[SlyDEV] ${message}`);

const configs = [
  {
    bundle: 'external',
    ssr: false,
    path: pathToRegexp('/external*'),
  },
  {
    bundle: 'community-details',
    ssr: true,
    path: pathToRegexp(`/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`),
  },
  {
    bundle: 'main',
    ssr: true,
    path: pathToRegexp('*'),
  },
];

const context = {
  ready: null,
  callbacks: [],
  node: {},
  web: {},
};

// Webpack @4, for @5 modifications are needed
export function clientDevMiddleware() {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpackConfig = require('../webpack.config');
  const webpack = require('webpack');
  const wdm = require('webpack-dev-middleware');
  const compiler = webpack(webpackConfig);

  const webpackDevMiddleware = wdm(compiler, {
    logLevel: 'silent',
    publicPath,
    writeToDisk(filePath) {
      return /dist\/node\//.test(filePath);
    },
  });

  function invalid() {
    if (context.ready) {
      info('Compiling...');
      context.ready = false;

      if (context.callbacks.length) {
        info('Cancelling delayed requests');
        let callback;
        // eslint-disable-next-line no-cond-assign
        while (callback = context.callbacks.shift()) {
          callback(new Error('Cancelling delayed request'));
        }
      }
      context.callbacks = [];
    }
  }

  function done() {
    info('Compiling done!');

    try {
      context.ready = true;
      if (context.callbacks.length) {
        info(`Responding to [${context.callbacks.length}] delayed requests`);
        let callback;
        // eslint-disable-next-line no-cond-assign
        while (callback = context.callbacks.shift()) {
          callback();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  function failed(error) {
    console.error(error);
  }

  function statsEmit(compiler) {
    // taken from loadable webpack plugin
    const stats = compiler.getStats().toJson({
      hash: true,
      publicPath: true,
      assets: true,
      chunks: false,
      modules: false,
      source: false,
      errorDetails: false,
      timings: false,
    });
    context[compiler.name] = stats;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const subCompiler of compiler.compilers) {
    // working only for webpack 4
    // taken from loadable webpack plugin
    subCompiler.options.output.jsonpFunction = '__LOADABLE_LOADED_CHUNKS__';
    subCompiler.hooks.emit.tap('SlyDev', statsEmit);
    subCompiler.hooks.failed.tap('SlyDev', failed);
  }
  compiler.hooks.watchRun.tap('SlyDev', invalid);
  compiler.hooks.invalid.tap('SlyDev', invalid);
  compiler.hooks.done.tap('SlyDev', done);

  return (req, res, next) => {
    if (context.ready === null) {
      return next(new Error('[SlyDEV] Not initialized'));
    }

    return webpackDevMiddleware(req, res, (error) => {
      try {
        const respond = e => next(e);

        if (error) {
          respond(error);
        } else if (context.ready) {
          respond();
        } else {
          info('Delaying request');
          context.callbacks.push(respond);
        }
      } catch (e) {
        return next(e);
      }

      return null;
    });
  };
}

export function clientConfigsMiddleware() {
  if (!isDev) {
    context.public = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'dist/public/loadable-stats.json')));
    context.node = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'dist/node/loadable-stats.json')));
  }

  // patchConfigs(context);

  return (req, res, next) => {
    const path = parseUrl(req).pathname;

    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];

      if (path.match(config.path)) {
        const extractor = new ChunkExtractor({
          stats: context.public,
          entrypoints: [config.bundle],
        });

        req.clientConfig = {
          ...config,
          extractor,
        };

        if (config.ssr) {
          const extractorSsr = new ChunkExtractor({
            stats: context.node,
            entrypoints: [config.bundle],
          });

          const { default: ClientApp } = extractorSsr.requireEntrypoint(config.bundle);
          req.clientConfig.ClientApp = ClientApp;
        }

        break;
      }
    }

    next();
  };
}
