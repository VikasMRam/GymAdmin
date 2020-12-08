/* eslint-disable no-console */
// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path');
const fs = require('fs');

const LoadablePlugin = require('@loadable/webpack-plugin');
const UglifyJs = require('uglify-es');
const cssmin = require('cssmin');
const nodeExternals = require('webpack-node-externals');
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
} = require('webpack-blocks');

const {
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
  DOMAIN,
  GOOGLE_MAPS_API_KEY,
  SOURCE,
  EXTERNAL_ASSET_URL,
  EXTERNAL_URL,
  EXTERNAL_DEFAULT_WIDGET_TYPE,
  FB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  MUTE_REDUX_LOGGER,
  HIDE_CHATBOX,
  ENABLE_EXPERIMENT_DEBUGGER,
  DISABLE_EXPERIMENTS,
} = require('./env');

const VERSION = fs.existsSync('./VERSION') ? fs.readFileSync('./VERSION', 'utf8').trim() : '';

const isDev = NODE_ENV === 'development';
const isStaging = SLY_ENV === 'staging';

// use __dirname as this file can be included from root package
const sourcePath = path.join(__dirname, SOURCE);
const rootPath = path.join(__dirname, '..', '..');
const outputPath = path.join(__dirname, 'dist');
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

const name = name => (context, { merge }) =>
  merge({
    name,
  });

const mode = (context, { merge }) =>
  merge({
    mode: NODE_ENV,
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
    'process.env.DOMAIN': DOMAIN,
    'process.env.GOOGLE_MAPS_API_KEY': GOOGLE_MAPS_API_KEY,
    'process.env.VERSION': VERSION,
    'process.env.FB_CLIENT_ID': FB_CLIENT_ID,
    'process.env.GOOGLE_CLIENT_ID': GOOGLE_CLIENT_ID,
    'process.env.HIDE_CHATBOX': HIDE_CHATBOX,
    'process.env.DISABLE_EXPERIMENTS': DISABLE_EXPERIMENTS,
    'process.env.MUTE_REDUX_LOGGER': MUTE_REDUX_LOGGER,
    'process.env.ENABLE_EXPERIMENT_DEBUGGER': ENABLE_EXPERIMENT_DEBUGGER,
  }),

  match(['*.js', '!*node_modules*'], [babel({
    rootMode: 'upward',
  })]),
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
    externals: [nodeExternals({
      modulesDir: path.join(rootPath, 'node_modules'),
    })],
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
  const isWeb = target === 'public';
  return createConfig([
    name(target),

    base,

    setOutput({
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.join(outputPath, target),
      libraryTarget: isWeb ? undefined : 'commonjs2',
      publicPath: `${PUBLIC_PATH}/`,
    }),

    when(!isWeb, [node]),

    entryPoint(entries),

    // when(isWeb, [
    //   optimization({
    //     // concatenateModules: false,
    //     splitChunks: {
    //       chunks: 'all',
    //     },
    //   }),
    // ]),

    /*
    addPlugins([
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: 'true',
      }),
    ]),
    */

    // eslint-disable-next-line no-prototype-builtins
    when(entries.hasOwnProperty('external'), [externalWidget]),

    assets,

    devCORS,

    when(!isDev, [
      addPlugins([new LoadablePlugin()]),
    ]),

    when(isDev || isStaging, [sourceMaps()]),
  ]);
};

const webpackConfig = [
  client('public', {
    'community-details': clientCommunityDetailWebEntryPath,
    main: clientWebEntryPath,
    external: externalEntryPath,
  }),
  client('node', {
    'community-details': clientCommunityDetailNodeEntryPath,
    main: clientNodeEntryPath,
  }),
];

if (!isDev) {
  webpackConfig.push(server);
}

module.exports = webpackConfig;
