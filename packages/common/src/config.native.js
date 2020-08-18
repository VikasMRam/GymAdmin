import merge from 'lodash/merge';

const config = {
  all: {
    slyEnv: process.env.SLY_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://www.lvh.me/v0',
    host: process.env.HOST,
    isDev: false,
    isTest: false,
    isProd: false,
  },

  test: {
    isTest: true,
    isDev: false,
    host: 'http://localhost',
  },

  development: {
    isDev: true,
    host: 'http://www.lvh.me',
  },

  staging: {
    isDev: false,
  },

  production: {
    isDev: false,
    isProd: true,
  },
};

module.exports = merge(config.all, config[config.all.slyEnv]);
