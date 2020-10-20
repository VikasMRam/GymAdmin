// defaults to dev env, otherwise specify with env vars

const tryJson = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const envPick = (name, otherwise) => {
  return process.env[name]
    ? tryJson(process.env[name])
    : otherwise;
};


module.exports.STORYBOOK_GIT_BRANCH = process.env.STORYBOOK_GIT_BRANCH;
module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.SLY_ENV = process.env.SLY_ENV || 'development';
module.exports.GA_ENV = process.env.GA_ENV || 'development';
module.exports.HOST = process.env.HOST || 'http://www.lvh.me';
module.exports.PORT = process.env.PORT || 8000;
module.exports.DEV_PORT = process.env.DEV_PORT || +process.env.PORT + 1 || 8001;
module.exports.ASSETS_URL = process.env.ASSETS_URL || 'https://d354o3y6yz93dt.cloudfront.net';
module.exports.PUBLIC_PATH = '/react-assets';
module.exports.API_URL = process.env.API_URL || 'http://www.lvh.me/v0';
module.exports.DOMAIN = process.env.DOMAIN || 'lvh.me';
module.exports.SOURCE = process.env.SOURCE || 'src';
module.exports.FB_CLIENT_ID = process.env.FB_CLIENT_ID || '624602444328776';
module.exports.GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyALxJg-oMW7SvkQ27KFTuWjTLedXcAhrZE';
module.exports.GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID || '522248695659-f0b3obj2ggorooclkfnt2fsfpo14urti.apps.googleusercontent.com';
module.exports.HIDE_CHATBOX = envPick('HIDE_CHATBOX', false);
module.exports.ENABLE_EXPERIMENT_DEBUGGER = envPick('ENABLE_EXPERIMENT_DEBUGGER', false);
module.exports.DISABLE_EXPERIMENTS = envPick('DISABLE_EXPERIMENTS', false);
module.exports.MUTE_REDUX_LOGGER = envPick('MUTE_REDUX_LOGGER', true);
// replacements for widgets.js
module.exports.EXTERNAL_PATH = process.env.EXTERNAL_PATH || '/external';
module.exports.EXTERNAL_ASSET_URL = `${process.env.PUBLIC_PATH}/external`;
module.exports.EXTERNAL_URL = `${process.env.HOST}${process.env.EXTERNAL_PATH}`;
module.exports.EXTERNAL_DEFAULT_WIDGET_TYPE = 'wizards/caw';
