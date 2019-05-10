/* eslint-disable no-console */
// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path');
const fs = require('fs');

const UglifyJs = require('uglify-es');
const cssmin = require('cssmin');
// const splitVendor = require('webpack-blocks-split-vendor');
const nodeExternals = require('webpack-node-externals');
// const Visualizer = require('webpack-visualizer-plugin');
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
  uglify,
  sourceMaps,
  devServer,
  when,
} = require('webpack-blocks');

const ChildConfigPlugin = require('./private/webpack/ChildConfigPlugin');
const AssetsByTypeAndBundlePlugin = require('./private/webpack/AssestByTypeAndBundlePlugin');
const PrependPlugin = require('./private/webpack/PrependPlugin');

// defaults to dev env, otherwise specify with env vars
const { STORYBOOK_GIT_BRANCH, GOOGLE_MAPS_API_KEY } = process.env;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SLY_ENV = process.env.SLY_ENV || 'development';
const GA_ENV = process.env.GA_ENV || 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/react-assets';
const HOST = process.env.HOST || 'http://www.lvh.me';
const PORT = process.env.PORT || 8000;
const DEV_PORT = process.env.DEV_PORT || (+PORT + 1) || 8001;
const API_URL = process.env.API_URL || 'http://www.lvh.me/v0';
const AUTH_URL = process.env.AUTH_URL || 'http://www.lvh.me/users/auth_token';
const DOMAIN = process.env.DOMAIN || 'lvh.me';
const VERSION = fs.existsSync('./VERSION') ? fs.readFileSync('./VERSION', 'utf8').trim() : '';
const SOURCE = process.env.SOURCE || 'src';
const devDomain = `${HOST}:${DEV_PORT}/`;
const isDev = NODE_ENV === 'development';
const isStaging = SLY_ENV === 'staging';
const FB_CLIENT_ID = process.env.FB_CLIENT_ID || '624602444328776';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '522248695659-f0b3obj2ggorooclkfnt2fsfpo14urti.apps.googleusercontent.com';
const MUTE_REDUX_LOGGER = process.env.MUTE_REDUX_LOGGER || false;
const HIDE_CHATBOX = process.env.HIDE_CHATBOX || false;

// replacements for widgets.js
const EXTERNAL_WIZARDS_PATH = process.env.EXTERNAL_WIZARDS_PATH || '/external/wizards';
const EXTERNAL_ASSET_URL = (isDev ? `${devDomain}external` : `${PUBLIC_PATH}/external`);
const EXTERNAL_WIZARDS_ROOT_URL = HOST + EXTERNAL_WIZARDS_PATH;

console.info('Using config', JSON.stringify({
  STORYBOOK_GIT_BRANCH,
  NODE_ENV,
  SLY_ENV,
  GA_ENV,
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
  EXTERNAL_WIZARDS_PATH,
  EXTERNAL_WIZARDS_ROOT_URL,
  FB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  MUTE_REDUX_LOGGER,
  HIDE_CHATBOX,
}, null, 2));

const webpackPublicPath = `${PUBLIC_PATH}/`.replace(/\/\/$/gi, '/');
const sourcePath = path.join(process.cwd(), SOURCE);
const outputPath = path.join(process.cwd(), 'dist', 'public');
const clientConfigsPath = path.join(process.cwd(), 'dist', 'clientConfigs.json');
const clientEntryPath = path.join(sourcePath, 'client.js');
const dashboardEntryPath = path.join(sourcePath, 'dashboard.js');
const serverEntryPath = path.join(sourcePath, 'server.js');
// external scripts and assets
const externalSourcePath = path.join(sourcePath, 'external');
const externalWidgetSourcePath = path.join(externalSourcePath, 'widget');
const externalWidgetEntryPath = path.join(externalWidgetSourcePath, 'widget.js');
const externalWidgetCssEntryPath = path.join(externalWidgetSourcePath, 'widget.css');
// todo: need better approach than hardcoding assets
const closeIconSvg = fs.readFileSync(`${externalWidgetSourcePath}/close-regular.svg`, 'utf8');
const externalWizardsEntryPath = path.join(externalSourcePath, 'wizards', 'index.js');

const mode = (context, { merge }) => merge({
  mode: NODE_ENV,
});

// const babel = (context, { merge }) => merge({
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader'
//       },
//     ],
//   },
// });

const resolveModules = modules => (context, { merge }) => merge({
  resolve: {
    alias: {
      sly: modules,
    },
    modules: [].concat(modules, 'node_modules'),
  },
});

const assets = (context, { merge }) => merge({
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
    path: outputPath,
    publicPath: webpackPublicPath,
  }),

  defineConstants({
    'process.env.STORYBOOK_GIT_BRANCH': STORYBOOK_GIT_BRANCH,
    'process.env.NODE_ENV': NODE_ENV,
    'process.env.SLY_ENV': SLY_ENV,
    'process.env.GA_ENV': GA_ENV,
    'process.env.PUBLIC_PATH': PUBLIC_PATH,
    'process.env.HOST': HOST,
    'process.env.PORT': PORT,
    'process.env.API_URL': API_URL,
    'process.env.AUTH_URL': AUTH_URL,
    'process.env.DOMAIN': DOMAIN,
    'process.env.GOOGLE_MAPS_API_KEY': GOOGLE_MAPS_API_KEY,
    'process.env.EXTERNAL_WIZARDS_PATH': EXTERNAL_WIZARDS_PATH,
    'process.env.VERSION': VERSION,
    'process.env.FB_CLIENT_ID': FB_CLIENT_ID,
    'process.env.GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID,
    'process.env.MUTE_REDUX_LOGGER': MUTE_REDUX_LOGGER,
    'process.env.HIDE_CHATBOX': HIDE_CHATBOX || false,
  }),

  match(['*.js', '!*node_modules*'], [babel()]),

  resolveModules(sourcePath),

  env('development', [
    setOutput({
      publicPath: devDomain,
    }),
  ]),

  addPlugins([new webpack.ProgressPlugin()]),
]);

const devCORS = group([
  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: webpackPublicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      disableHostCheck: true,
      host: '0.0.0.0',
      port: DEV_PORT,
      compress: true,
    }),
    addPlugins([new webpack.NamedModulesPlugin()]),
  ]),
]);

const uglifyJs = group([
  env('production', [
    uglify({
      sourceMap: isStaging,
      compress: { warnings: false },
      output: { comments: false },
    }),
  ]),
]);

// order matters to how the routes are mounted
const clientConfigs = [
  {
    bundle: 'vendor',
    ssr: true,
    isCommon: true,
    path: '*',
  },
  {
    bundle: 'wizards',
    ssr: false,
    path: '/external/wizards*',
  },
  {
    bundle: 'dashboard',
    ssr: true,
    path: '/dashboard*',
  },
  {
    bundle: 'client',
    ssr: true,
    path: '*',
  },
];

const server = createConfig([
  base,

  entryPoint({ server: serverEntryPath }),

  setOutput({
    filename: '../[name].js',
    libraryTarget: 'commonjs2',
  }),

  (context, { merge }) => merge({
    target: 'node',
    externals: [nodeExternals()],
    stats: 'errors-only',
  }),

  assets,

  addPlugins([
    new PrependPlugin({
      prepend: () => `global.clientConfigs = require("${clientConfigsPath}");\n`,
    }),
  ]),

  env('development', [
    (context, { merge }) => merge({
      watch: true,
    }),
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

if (isDev || isStaging) {
  console.log('Will do sourcemaps');
}

const replaceExternalConstants = (text) => {
  const replacements = {
    'process.env.EXTERNAL_ASSET_URL': EXTERNAL_ASSET_URL,
    'process.env.EXTERNAL_WIZARDS_ROOT_URL': EXTERNAL_WIZARDS_ROOT_URL,
    'process.env.CLOSE_ICON_SVG': closeIconSvg,
    'process.env.SLY_ENV': SLY_ENV,
    'process.env.VERSION': VERSION,
  };
  const replacedText = Object.keys(replacements).reduce((previous, match) => {
    return previous.replace(new RegExp(match, 'g'), JSON.stringify(replacements[match]));
  }, text);
  return replacedText;
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

const client = createConfig([
  base,

  entryPoint({
    client: clientEntryPath,
    dashboard: dashboardEntryPath,
    wizards: externalWizardsEntryPath,
  }),

  externalWidget,

  assets,

  devCORS,

  uglifyJs,

  addPlugins([
    new AssetsByTypeAndBundlePlugin({
      path: clientConfigsPath,
      clientConfigs,
    }),
    new ChildConfigPlugin(server, { when: 'afterEmit' }),
  ]),

  when(isDev || isStaging, [sourceMaps()]),
]);

module.exports = client;
