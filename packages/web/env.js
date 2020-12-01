// defaults to dev env, otherwise specify with env vars

const tryJson = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const envPick = (value, otherwise = undefined) => {
  return typeof value === 'string'
    ? tryJson(value)
    : otherwise;
};


module.exports.STORYBOOK_GIT_BRANCH = envPick(process.env.STORYBOOK_GIT_BRANCH);
module.exports.NODE_ENV = envPick(process.env.NODE_ENV, 'development');
module.exports.SLY_ENV = envPick(process.env.SLY_ENV, 'development');
module.exports.GA_ENV = envPick(process.env.GA_ENV, 'development');
module.exports.HOST = envPick(process.env.HOST, 'http://www.lvh.me');
module.exports.PORT = process.env.PORT || 8000;
module.exports.DEV_PORT = envPick(process.env.DEV_PORT, +process.env.PORT + 1 || 8001);
module.exports.ASSETS_URL = envPick(process.env.ASSETS_URL, 'https://d354o3y6yz93dt.cloudfront.net');
module.exports.PUBLIC_PATH = '/react-assets';
module.exports.API_URL = envPick(process.env.API_URL, 'http://www.lvh.me/v0');
module.exports.DOMAIN = envPick(process.env.DOMAIN, 'lvh.me');
module.exports.SOURCE = envPick(process.env.SOURCE, 'src');
module.exports.FB_CLIENT_ID = envPick(process.env.FB_CLIENT_ID, '624602444328776');
module.exports.GOOGLE_MAPS_API_KEY = envPick(process.env.GOOGLE_MAPS_API_KEY, 'AIzaSyALxJg-oMW7SvkQ27KFTuWjTLedXcAhrZE');
module.exports.GOOGLE_CLIENT_ID = envPick(process.env.GOOGLE_CLIENT_ID, '522248695659-f0b3obj2ggorooclkfnt2fsfpo14urti.apps.googleusercontent.com');
module.exports.HIDE_CHATBOX = envPick(process.env.HIDE_CHATBOX, false);
module.exports.ENABLE_EXPERIMENT_DEBUGGER = envPick(process.env.ENABLE_EXPERIMENT_DEBUGGER, false);
module.exports.DISABLE_EXPERIMENTS = envPick(process.env.DISABLE_EXPERIMENTS, false);
module.exports.MUTE_REDUX_LOGGER = envPick(process.env.MUTE_REDUX_LOGGER, true);
// replacements for widgets.js
module.exports.EXTERNAL_PATH = envPick(process.env.EXTERNAL_PATH, '/external');
module.exports.EXTERNAL_ASSET_URL = `${process.env.PUBLIC_PATH}/external`;
module.exports.EXTERNAL_URL = `${process.env.HOST}${process.env.EXTERNAL_PATH}`;
module.exports.EXTERNAL_DEFAULT_WIDGET_TYPE = 'wizards/caw';

console.log('env.js PORT', process.env.PORT, process.argv);
