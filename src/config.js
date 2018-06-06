const merge = require('lodash/merge');

// TODO: find a more elegant solution to
// storybook serve it's own assets, so to avoid trouble:
const isStorybook = !!process.env.STORYBOOK_GIT_BRANCH;
const publicPath = isStorybook
  ? ''
  : process.env.PUBLIC_PATH;

const config = {
  all: {
    env: process.env.NODE_ENV,
    slyEnv: process.env.SLY_ENV,
    isDev: process.env.NODE_ENV,
    basename: process.env.BASENAME,
    host: process.env.HOST,
    port: process.env.PORT,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: process.env.API_URL,
    authTokenUrl: process.env.AUTH_URL,
    gMapsApiKey: 'AIzaSyBbN8J_ogumAythgDCzwXzbuIn6qP-w0fM',
    gAnalyticsKey: 'UA-55078261-2',
    eventServerUrl: 'http://localhost:8888/events/new',
    cookieDomain: process.env.DOMAIN,
    publicPath,
    olarkSiteId: '9319-500-10-7635',
  },

  test: {},
  development: {},

  staging: {
    isDev: false,
  },

  production: {
    isDev: false,
    eventServerUrl: 'https://event.seniorly.com/events/new',
    gAnalyticsKey: 'UA-55078261-1',
  },
};

module.exports = merge(config.all, config[config.all.slyEnv]);
