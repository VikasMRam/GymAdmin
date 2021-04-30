const merge = require('lodash/merge');

const {
  NODE_ENV,
  SLY_ENV,
  GA_ENV,
  ASSETS_URL,
  PUBLIC_PATH,
  HOST,
  PORT,
  API_URL,
  CMS_URL,
  DOMAIN,
  GOOGLE_MAPS_API_KEY,
  FB_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  MUTE_REDUX_LOGGER,
  HIDE_CHATBOX,
  ENABLE_EXPERIMENT_DEBUGGER,
  DISABLE_EXPERIMENTS,
} = require('../env');

const { VERSION } = process.env;

// TODO: find a more elegant solution to
// storybook serve it's own assets, so to avoid trouble:
const isStorybook = !!global.STORYBOOK_ENV;
const publicPath = isStorybook
  ? ''
  : PUBLIC_PATH;

const config = {
  all: {
    env: NODE_ENV,
    slyEnv: SLY_ENV,
    gaEnv: GA_ENV,
    isDev: NODE_ENV,
    isTest: false,
    isProd: false,
    host: HOST,
    port: PORT,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: API_URL,
    cmsUrl: CMS_URL,
    gMapsApiKey: GOOGLE_MAPS_API_KEY,
    gAnalyticsKey: 'UA-55078261-2',
    eventServerUrl: 'http://localhost:8888/events/new',
    domain: DOMAIN,
    publicPath,
    assetsUrl: ASSETS_URL,
    facebookPixelId: '586147298262302',
    googleTagManagerId: 'GTM-NTC7HG2',
    rokoApiKey: 'OgRs7tffvTdiKOKqsDSwwLgyJF6wHYVxFAK+qQO4paU=',
    version: VERSION,
    facebookAppId: FB_CLIENT_ID,
    googleAppId: GOOGLE_CLIENT_ID,
    olarkSiteId: '9319-500-10-7635',
    muteReduxLogger: true,
    hideChatbox: false,
    disableExperiments: DISABLE_EXPERIMENTS,
    enableExperimentsDebugger: ENABLE_EXPERIMENT_DEBUGGER,
    tinyMCEApiKey: 'zalf4x4cr6354ko1klhtu90vmtbee1qw9r4j1qy1dpm3xabb',
    gadsClient: 'ca-pub-7265665320394778',
    gadSlots: {
      profile: '6273714139',
      resource: '3335478033',
      search: '2390417245',
    },
  },

  test: {
    isTest: true,
    isDev: false,
    publicPath: '',
    domain: 'localhost',
    host: 'http://localhost',
    apiUrl: 'http://localhost/v0',
    assetsUrl: 'http://localhost/assets',
  },

  development: {
    muteReduxLogger: MUTE_REDUX_LOGGER,
    hideChatbox: HIDE_CHATBOX,
  },

  staging: {
    isDev: false,
    eventServerUrl: 'https://event.myseniorly.com/events/new',
    facebookAppId: '299735431723954',
    googleAppId: '522248695659-ces03d2ptbgegiusk0c6v8j9abc7pdbf.apps.googleusercontent.com',
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
    googleAppId: '522248695659-kbpgg45i1pg4kt1ahsqm2trdr8cdms2k.apps.googleusercontent.com',
  },
};

const mergedConfig = merge(config.all, config[config.all.slyEnv]);

module.exports = mergedConfig;
