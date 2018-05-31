// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path');
const devServer = require('@webpack-blocks/dev-server2');
const splitVendor = require('webpack-blocks-split-vendor');
const happypack = require('webpack-blocks-happypack');
const serverSourceMap = require('webpack-blocks-server-source-map');
const nodeExternals = require('webpack-node-externals');
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin');
const ChildConfigPlugin = require('webpack-child-config-plugin');
const SpawnPlugin = require('webpack-spawn-plugin');

const {
  addPlugins,
  createConfig,
  entryPoint,
  env,
  setOutput,
  sourceMaps,
  defineConstants,
  webpack,
  group,
} = require('@webpack-blocks/webpack2');

// defaults to dev env, otherwise specify with env vars
const STORYBOOK_GIT_BRANCH = process.env.STORYBOOK_GIT_BRANCH;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SLY_ENV = process.env.SLY_ENV || 'development';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/react-assets';
const HOST = process.env.HOST || 'www.lvh.me';
const PORT = process.env.PORT || 8000;
const DEV_PORT = +PORT + 1 || 8001;
const BASENAME = process.env.BASENAME || '';
const API_URL = process.env.API_URL || 'http://www.lvh.me/v0';
const AUTH_URL = process.env.AUTH_URL || 'http://www.lvh.me/users/auth_token';
const DOMAIN = process.env.DOMAIN || 'lvh.me';

const SOURCE = process.env.SOURCE || 'src';

const webpackPublicPath = `${PUBLIC_PATH}/`.replace(/\/\/$/gi, '/');
const sourcePath = path.join(process.cwd(), SOURCE);
const outputPath = path.join(process.cwd(), 'dist/public');
const assetsPath = path.join(process.cwd(), 'dist/assets.json');
const clientEntryPath = path.join(sourcePath, 'client.js');
const serverEntryPath = path.join(sourcePath, 'server.js');
const devDomain = `http://${HOST}:${DEV_PORT}/`;

const isDev = NODE_ENV === 'development';
const isStaging = SLY_ENV === 'staging';

const when = (condition, setters) =>
  condition ? group(setters) : () => _ => _;

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
});

const assets = () => () => ({
  module: {
    rules: [
      {
        test: /\.(ico|png|jpe?g|svg|woff2?|ttf|eot)$/,
        loader: 'url-loader?limit=8000',
      },
    ],
  },
});

const resolveModules = modules => () => ({
  resolve: {
    alias: {
      sly: modules,
    },
    modules: [].concat(modules, 'node_modules'),
  },
});

const base = () =>
  group([
    setOutput({
      filename: '[name].[hash].js',
      path: outputPath,
      publicPath: webpackPublicPath,
    }),
    defineConstants({
      'process.env.STORYBOOK_GIT_BRANCH': STORYBOOK_GIT_BRANCH,
      'process.env.NODE_ENV': NODE_ENV,
      'process.env.SLY_ENV': SLY_ENV,
      'process.env.PUBLIC_PATH': PUBLIC_PATH,
      'process.env.HOST': HOST,
      'process.env.PORT': PORT,
      'process.env.BASENAME': BASENAME,
      'process.env.API_URL': API_URL,
      'process.env.AUTH_URL': AUTH_URL,
      'process.env.DOMAIN': DOMAIN,
    }),
    addPlugins([new webpack.ProgressPlugin()]),
    happypack([babel()]),
    assets(),
    resolveModules(sourcePath),

    env('development', [
      setOutput({
        publicPath: devDomain,
      }),
    ]),
  ]);

const server = createConfig([
  base(),
  entryPoint({ server: serverEntryPath }),
  setOutput({
    filename: '../[name].js',
    libraryTarget: 'commonjs2',
  }),
  addPlugins([
    new webpack.BannerPlugin({
      banner: 'global.assets = require("./assets.json");',
      raw: true,
    }),
  ]),
  () => ({
    target: 'node',
    externals: [nodeExternals()],
    stats: 'errors-only',
  }),

  env('development', [
    serverSourceMap(),
    addPlugins([new SpawnPlugin('node', ['--inspect', '.'])]),
    () => ({
      watch: true,
    }),
  ]),
]);

if (isDev || isStaging) {
  console.log('Will do sourcemaps');
}

const client = createConfig([
  base(),

  entryPoint({
    client: clientEntryPath,
  }),

  addPlugins([
    new AssetsByTypePlugin({ path: assetsPath }),
    new ChildConfigPlugin(server),
  ]),

  when(isDev || isStaging, [sourceMaps()]),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: webpackPublicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      host: HOST,
      port: DEV_PORT,
    }),
    addPlugins([new webpack.NamedModulesPlugin()]),
  ]),

  env('production', [
    //splitVendor(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: isStaging,
        compress: { warnings: false },
      }),
    ]),
  ]),
]);

module.exports = client;
