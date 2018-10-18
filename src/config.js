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
    isTest: false,
    isProd: false,
    basename: process.env.BASENAME,
    host: process.env.HOST,
    port: process.env.PORT,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: process.env.API_URL,
    authTokenUrl: process.env.AUTH_URL,
    gMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    gAnalyticsKey: 'UA-55078261-2',
    eventServerUrl: 'http://localhost:8888/events/new',
    cookieDomain: process.env.DOMAIN,
    publicPath,
    externalWizardsPath: process.env.EXTERNAL_WIZARDS_PATH,
    olarkSiteId: '',
    facebookPixelId: '586147298262302',
    googleTagManagerId: 'GTM-NTC7HG2',
    version: process.env.VERSION,
    facebookAppId: '624602444328776',
    googleAppId: '522248695659-4c2mmjjj3soorpg7stig9u2ecpr6j0nf',
  },

  test: {
    isTest: true,
    isDev: false,
    publicPath: '',
  },
  development: {
    enableExperimentsDebugger: true,
  },

  staging: {
    isDev: false,
    eventServerUrl: 'http://event.myseniorly.com/events/new',
    facebookAppId: '614862451969442',
    googleAppId: '522248695659-ces03d2ptbgegiusk0c6v8j9abc7pdbf',
  },

  production: {
    isDev: false,
    isProd: true,
    eventServerUrl: 'https://event.seniorly.com/events/new',
    gAnalyticsKey: 'UA-55078261-1',
    olarkSiteId: '9319-500-10-7635',
    facebookPixelId: '586147298262302',
    googleTagManagerId: 'GTM-5888W7H',
    facebookAppId: '1609538575934980',
    googleAppId: '522248695659-kbpgg45i1pg4kt1ahsqm2trdr8cdms2k',
  },
};

module.exports = merge(config.all, config[config.all.slyEnv]);
