const merge = require('lodash/merge');

// TODO: find a more elegant solution to
// storybook serve it's own assets, so to avoid trouble:
const isStorybook = !!global.STORYBOOK_ENV;
const publicPath = isStorybook
  ? ''
  : process.env.PUBLIC_PATH;

const config = {
  all: {
    env: process.env.NODE_ENV,
    slyEnv: process.env.SLY_ENV,
    gaEnv: process.env.GA_ENV,
    isDev: process.env.NODE_ENV,
    isTest: false,
    isProd: false,
    host: process.env.HOST,
    port: process.env.PORT,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: process.env.API_URL,
    gMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    gAnalyticsKey: 'UA-55078261-2',
    eventServerUrl: 'http://localhost:8888/events/new',
    domain: process.env.DOMAIN,
    publicPath,
    assetsUrl: process.env.ASSETS_URL,
    facebookPixelId: '586147298262302',
    googleTagManagerId: 'GTM-NTC7HG2',
    rokoApiKey: 'OgRs7tffvTdiKOKqsDSwwLgyJF6wHYVxFAK+qQO4paU=',
    version: process.env.VERSION,
    facebookAppId: process.env.FB_CLIENT_ID,
    googleAppId: process.env.GOOGLE_CLIENT_ID,
    olarkSiteId: '9319-500-10-7635',
    muteReduxLogger: false,
    hideChatbox: false,
    loadAutoComplete: !process.env.OFFLINE_MODE,
    disableExperiments: process.env.DISABLE_EXPERIMENTS,
    enableExperimentsDebugger: process.env.ENABLE_EXPERIMENT_DEBUGGER,
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
    muteReduxLogger: process.env.MUTE_REDUX_LOGGER,
    hideChatbox: process.env.HIDE_CHATBOX,
    loadAutoComplete: !process.env.OFFLINE_MODE,
  },

  staging: {
    isDev: false,
    eventServerUrl: 'https://event.myseniorly.com/events/new',
    facebookAppId: '614862451969442',
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

module.exports = merge(config.all, config[config.all.slyEnv]);
