// https://github.com/diegohaz/arc/wiki/Webpack
const path = require('path')
const devServer = require('@webpack-blocks/dev-server2')
const splitVendor = require('webpack-blocks-split-vendor')
const happypack = require('webpack-blocks-happypack')
const serverSourceMap = require('webpack-blocks-server-source-map')
const nodeExternals = require('webpack-node-externals')
const AssetsByTypePlugin = require('webpack-assets-by-type-plugin')
const ChildConfigPlugin = require('webpack-child-config-plugin')
const SpawnPlugin = require('webpack-spawn-plugin')

const {
  addPlugins, createConfig, entryPoint, env, setOutput,
  sourceMaps, defineConstants, webpack, group,
} = require('@webpack-blocks/webpack2')

const host = process.env.HOST || 'www.lvh.me'
const port = (+process.env.PORT + 1) || 8001
const sourceDir = process.env.SOURCE || 'src'
const publicPath = process.env.PUBLIC_PATH || '/react-assets';
const webpackPublicPath = `${publicPath}/`.replace(/\/\/$/gi, '/');
const sourcePath = path.join(process.cwd(), sourceDir)
const outputPath = path.join(process.cwd(), 'dist/public')
const assetsPath = path.join(process.cwd(), 'dist/assets.json')
const clientEntryPath = path.join(sourcePath, 'client.js')
const serverEntryPath = path.join(sourcePath, 'server.js')
const devDomain = `http://${host}:${port}/`

const babel = () => () => ({
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
})

const assets = () => () => ({
  module: {
    rules: [
      { test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/, loader: 'url-loader?limit=8000' },
    ],
  },
})

const resolveModules = modules => () => ({
  resolve: {
    alias: {
      sly: modules,
    },
    modules: [].concat(modules, 'node_modules'),
  },
})

const base = () => group([
  setOutput({
    filename: '[name].js',
    path: outputPath,
    publicPath: webpackPublicPath,
  }),
  defineConstants({
    'process.env.STORYBOOK_GIT_BRANCH': process.env.STORYBOOK_GIT_BRANCH,
    'process.env.NODE_ENV': process.env.NODE_ENV,
    'process.env.SLY_ENV': process.env.SLY_ENV,
    'process.env.PUBLIC_PATH': publicPath,
    'process.env.HOST': process.env.HOST,
    'process.env.PORT': process.env.PORT,
    'process.env.BASENAME': process.env.BASENAME,
    'process.env.API_URL': process.env.API_URL,
    'process.env.AUTH_URL': process.env.AUTH_URL,
    'process.env.DOMAIN': process.env.DOMAIN,
  }),
  addPlugins([
    new webpack.ProgressPlugin(),
  ]),
  happypack([
    babel(),
  ]),
  assets(),
  resolveModules(sourcePath),

  env('development', [
    setOutput({
      publicPath: devDomain,
    }),
  ]),
])

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
    addPlugins([
      new SpawnPlugin('node', ['--inspect', '.']),
    ]),
    () => ({
      watch: true,
    }),
  ]),
])

const client = createConfig([
  base(),
  entryPoint({
    client: clientEntryPath,
  }),
  addPlugins([
    new AssetsByTypePlugin({ path: assetsPath }),
    new ChildConfigPlugin(server),
  ]),

  env('development', [
    devServer({
      contentBase: 'public',
      stats: 'errors-only',
      historyApiFallback: { index: webpackPublicPath },
      headers: { 'Access-Control-Allow-Origin': '*' },
      host,
      port,
    }),
    sourceMaps(),
    addPlugins([
      new webpack.NamedModulesPlugin(),
    ]),
  ]),

  env('production', [
    splitVendor(),
    addPlugins([
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ]),
  ]),
])

module.exports = client
