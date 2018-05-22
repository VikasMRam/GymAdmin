const merge = require('lodash/merge');

// TODO: find a more elegant solution to
// storybook serve it's own assets, so to avoid trouble:
const isStorybook = !!process.env.STORYBOOK_GIT_BRANCH;
const publicPath = isStorybook
  ? ''
  : process.env.PUBLIC_PATH || '/react-assets';

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    slyEnv: process.env.SLY_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    basename: process.env.BASENAME || '',
    host: process.env.HOST || 'www.lvh.me',
    port: process.env.PORT || 8000,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: 'http://www.lvh.me/v0',
    authTokenUrl: 'http://www.lvh.me/users/auth_token',
    gMapsApiKey: 'AIzaSyBbN8J_ogumAythgDCzwXzbuIn6qP-w0fM',
    gAnalyticsKey: 'UA-55078261-2',
    eventServerUrl: 'http://localhost:8888/events/new',
    cookieDomain: process.env.DOMAIN || 'lvh.me',
    publicPath,

  },
  test: {},
  development: {
    cookieDomain: 'lvh.me',
    eventServerUrl: 'http://localhost:8888/events/new',
  },
  staging: {
    apiUrl: process.env.API_URL || 'http://www.myseniorly.com/v0',
    authTokenUrl: process.env.AUTH_URL  || 'http://www.myseniorly.com/users/auth_token',
    cookieDomain: process.env.DOMAIN || 'myseniorly.com',
  },
  production: {
    env: process.env.NODE_ENV || 'production',
    slyEnv: process.env.SLY_ENV || 'production',
    isDev: false,
    basename: process.env.BASENAME || '',
    host: process.env.HOST || 'https://www.teamseniorly.com',
    port: process.env.PORT || 8080,
    apiUrl: process.env.API_URL || 'https://www.teamseniorly.com/v0',
    authTokenUrl: process.env.AUTH_URL || 'https://www.teamseniorly.com/users/auth_token',
    cookieDomain: process.env.DOMAIN || 'teamseniorly.com',
    eventServerUrl: 'http://events.myseniorly.com/events/new',
    gAnalyticsKey: 'UA-55078261-1',
    publicPath: process.env.PUBLIC_PATH || 'https://dnmsvctzw2bbb.cloudfront.net/react-assets',
  },
};

module.exports = merge(config.all, config[config.all.slyEnv]);
