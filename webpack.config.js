/* eslint-disable no-console */
// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path');
const fs = require('fs');

const LoadablePlugin = require('@loadable/webpack-plugin');
const UglifyJs = require('uglify-es');
const cssmin = require('cssmin');
const nodeExternals = require('webpack-node-externals');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpawnPlugin = require('webpack-spawn-plugin');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const webpack = require('webpack');
const {
  match,
  babel,
  addPlugins,
  createConfig,
  entryPoint,
  env,
  setOutput,
  defineConstants,
  group,
  sourceMaps,
  devServer,
  when,
  setDevTool,
} = require('webpack-blocks');

// defaults to dev env, otherwise specify with env vars
const { STORYBOOK_GIT_BRANCH } = process.env;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SLY_ENV = process.env.SLY_ENV || 'development';
const GA_ENV = process.env.GA_ENV || 'development';
const HOST = process.env.HOST || 'http://www.lvh.me';
const PORT = process.env.PORT || 8000;
const DEV_PORT = process.env.DEV_PORT || +PORT + 1 || 8001;
const ASSETS_URL = process.env.ASSETS_URL || 'https://d354o3y6yz93dt.cloudfront.net';
const PUBLIC_PATH = process.env.PUBLIC_PATH || (NODE_ENV === 'development' ? `${HOST}:${DEV_PORT}` : '/react-assets');
const API_URL = process.env.API_URL || 'http://www.lvh.me/v0';
const AUTH_URL = process.env.AUTH_URL || 'http://www.lvh.me/users/auth_token';
const DOMAIN = process.env.DOMAIN || 'lvh.me';
const VERSION = fs.existsSync('./VERSION') ? fs.readFileSync('./VERSION', 'utf8').trim() : '';
const SOURCE = process.env.SOURCE || 'src';
const FB_CLIENT_ID = process.env.FB_CLIENT_ID || '624602444328776';
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyALxJg-oMW7SvkQ27KFTuWjTLedXcAhrZE';
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || '522248695659-f0b3obj2ggorooclkfnt2fsfpo14urti.apps.googleusercontent.com';
const MUTE_REDUX_LOGGER = process.env.MUTE_REDUX_LOGGER || false;
const HIDE_CHATBOX = process.env.HIDE_CHATBOX || false;
const ENABLE_EXPERIMENT_DEBUGGER = process.env.ENABLE_EXPERIMENT_DEBUGGER || false;
const DISABLE_EXPERIMENTS = process.env.DISABLE_EXPERIMENTS || false;

const isDev = NODE_ENV === 'development';
const isStaging = SLY_ENV === 'staging';

// replacements for widgets.js
const EXTERNAL_PATH = process.env.EXTERNAL_PATH || '/external';
const EXTERNAL_ASSET_URL = `${PUBLIC_PATH}/external`;
const EXTERNAL_URL = `${HOST}${EXTERNAL_PATH}`;
const EXTERNAL_DEFAULT_WIDGET_TYPE = 'wizards/caw';

console.info(
  'Using config',
  JSON.stringify(
    {
      STORYBOOK_GIT_BRANCH,
      NODE_ENV,
      SLY_ENV,
      GA_ENV,
      ASSETS_URL,
      PUBLIC_PATH,
      HOST,
      PORT,
      DEV_PORT,
      API_URL,
      AUTH_URL,
      DOMAIN,
      GOOGLE_MAPS_API_KEY,
      SOURCE,
      EXTERNAL_ASSET_URL,
      EXTERNAL_PATH,
      EXTERNAL_URL,
      EXTERNAL_DEFAULT_WIDGET_TYPE,
      FB_CLIENT_ID,
      GOOGLE_CLIENT_ID,
      MUTE_REDUX_LOGGER,
      HIDE_CHATBOX,
      ENABLE_EXPERIMENT_DEBUGGER,
      DISABLE_EXPERIMENTS,
    },
    null,
    2
  )
);

const sourcePath = path.join(process.cwd(), SOURCE);
const outputPath = path.join(process.cwd(), 'dist');
const serverEntryPath = path.join(sourcePath, 'server.js');
// external scripts and assets
const externalSourcePath = path.join(sourcePath, 'external');
const externalWidgetSourcePath = path.join(externalSourcePath, 'widget');
const externalWidgetEntryPath = path.join(externalWidgetSourcePath, 'widget.js');
const externalWidgetCssEntryPath = path.join(externalWidgetSourcePath, 'widget.css');
// todo: need better approach than hardcoding assets
const closeIconSvg = fs.readFileSync(`${externalWidgetSourcePath}/close-regular.svg`, 'utf8');
const clientWebEntryPath = path.join(sourcePath, 'client-web.js');
const clientNodeEntryPath = path.join(sourcePath, 'client-node.js');
const externalEntryPath = path.join(externalSourcePath, 'apps', 'index.js');
const clientCommunityDetailWebEntryPath = path.join(sourcePath, 'client-community-detail-web.js');
const clientCommunityDetailNodeEntryPath = path.join(sourcePath, 'client-community-detail-node.js');

const mode = (context, { merge }) =>
  merge({
    mode: NODE_ENV,
  });

const resolveModules = modules => (context, { merge }) =>
  merge({
    resolve: {
      alias: {
        sly: modules,
      },
      modules: [].concat(modules, 'node_modules'),
    },
  });

const assets = (context, { merge }) =>
  merge({
    module: {
      rules: [
        {
          test: /\.(ico|png|jpe?g|svg|woff2?|ttf|eot)$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=8000',
        },
      ],
    },
  });

const base = group([
  mode,

  setOutput({
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: outputPath,
    publicPath: PUBLIC_PATH,
  }),

  defineConstants({
    'process.env.STORYBOOK_GIT_BRANCH': STORYBOOK_GIT_BRANCH,
    'process.env.NODE_ENV': NODE_ENV,
    'process.env.SLY_ENV': SLY_ENV,
    'process.env.GA_ENV': GA_ENV,
    'process.env.ASSETS_URL': ASSETS_URL,
    'process.env.PUBLIC_PATH': PUBLIC_PATH,
    'process.env.HOST': HOST,
    'process.env.PORT': PORT,
    'process.env.API_URL': API_URL,
    'process.env.AUTH_URL': AUTH_URL,
    'process.env.DOMAIN': DOMAIN,
    'process.env.GOOGLE_MAPS_API_KEY': GOOGLE_MAPS_API_KEY,
    'process.env.VERSION': VERSION,
    'process.env.FB_CLIENT_ID': FB_CLIENT_ID,
    'process.env.GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID,
    'process.env.MUTE_REDUX_LOGGER': MUTE_REDUX_LOGGER,
    'process.env.HIDE_CHATBOX': HIDE_CHATBOX,
    'process.env.DISABLE_EXPERIMENTS': DISABLE_EXPERIMENTS,
    'process.env.ENABLE_EXPERIMENT_DEBUGGER': ENABLE_EXPERIMENT_DEBUGGER,
  }),

  devServer({
    inline: false,
    writeToDisk(filePath) {
      return /dist\/(node\/|server)/.test(filePath) || /loadable-stats/.test(filePath);
    },
  }),

  match(['*.js', '!*node_modules*'], [babel()]),

  resolveModules(sourcePath),

  // addPlugins([new webpack.ProgressPlugin()]),
]);

const devCORS = group([
  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: PUBLIC_PATH },
      headers: { 'Access-Control-Allow-Origin': '*' },
      disableHostCheck: true,
      host: '0.0.0.0',
      port: DEV_PORT,
      compress: true,
    }),
    addPlugins([new webpack.NamedModulesPlugin()]),
  ]),
]);

const node = (context, { merge }) =>
  merge({
    target: 'node',
    externals: [nodeExternals()],
    stats: 'errors-only',
  });

const server = createConfig([
  base,

  entryPoint({ server: serverEntryPath }),

  setOutput({
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  }),

  node,

  assets,

  env('development', [
    (context, { merge }) =>
      merge({
        watch: true,
      }),
    setDevTool('eval-source-map'),
    addPlugins([
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false,
      }),
      new SpawnPlugin('node', [process.env.NODE_DEBUG_OPTION || '--inspect', '.']),
    ]),
  ]),
]);

const replaceExternalConstants = (text) => {
  const replacements = {
    'process.env.EXTERNAL_ASSET_URL': EXTERNAL_ASSET_URL,
    'process.env.EXTERNAL_URL': EXTERNAL_URL,
    'process.env.EXTERNAL_DEFAULT_WIDGET_TYPE': EXTERNAL_DEFAULT_WIDGET_TYPE,
    'process.env.CLOSE_ICON_SVG': closeIconSvg,
    'process.env.SLY_ENV': SLY_ENV,
    'process.env.VERSION': VERSION,
  };
  return Object.keys(replacements).reduce((previous, match) => {
    return previous.replace(new RegExp(match, 'g'), JSON.stringify(replacements[match]));
  }, text);
};

const externalWidget = group([
  env('development', [
    addPlugins([
      new MergeIntoSingleFilePlugin({
        files: {
          'external/widget.js': [externalWidgetEntryPath],
          'external/widget.css': [externalWidgetCssEntryPath],
        },
        transform: {
          'external/widget.js': text => replaceExternalConstants(text),
        },
      }),
    ]),
  ]),
  env('production', [
    addPlugins([
      new MergeIntoSingleFilePlugin({
        files: {
          'external/widget.js': [externalWidgetEntryPath],
          'external/widget.css': [externalWidgetCssEntryPath],
        },
        transform: {
          'external/widget.js': (text) => {
            const { error, code } = UglifyJs.minify(replaceExternalConstants(text));
            if (error) {
              console.error(error);
            }
            return code;
          },
          'external/widget.css': (text) => {
            return cssmin(text);
          },
        },
      }),
    ]),
  ]),
]);

const client = (target, entries) => {
  const isWeb = target.indexOf('web') !== -1;
  return createConfig([
    base,

    setOutput({
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.join(outputPath, isWeb ? 'public' : 'node'),
      libraryTarget: isWeb ? undefined : 'commonjs2',
      publicPath: `${PUBLIC_PATH}/`,
    }),

    when(!isWeb, [node]),

    entryPoint(entries),

    // when(isDev || isStaging, [
    //   addPlugins([
    //     new BundleAnalyzerPlugin({
    //       openAnalyzer: false,
    //       analyzerPort: 0,
    //     }),
    //   ]),
    // ]),

    // eslint-disable-next-line no-prototype-builtins
    when(entries.hasOwnProperty('external'), [externalWidget]),

    assets,

    devCORS,

    addPlugins([new LoadablePlugin({ filename: `../loadable-stats-${target}.json` })]),

    when(isDev || isStaging, [sourceMaps()]),
  ]);
};

module.exports = [
  client('web', {
    'community-details': clientCommunityDetailWebEntryPath,
    main: clientWebEntryPath,
    external: externalEntryPath,
  }),
  client('node', {
    'community-details': clientCommunityDetailNodeEntryPath,
    main: clientNodeEntryPath,
  }),
  server,
];
