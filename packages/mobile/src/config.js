import merge from 'lodash/merge';

const config = {
  all: {
    slyEnv: process.env.SLY_ENV || 'development',
    isDev: false,
    isTest: false,
    isProd: false,
  },

  test: {
    isTest: true,
    isDev: false,
    host: 'http://localhost',
    apiUrl: 'http://localhost/v0',
  },

  development: {
    isDev: true,
    host: process.env.HOST || 'http://www.lvh.me',
    apiUrl: process.env.API_URL || 'http://www.lvh.me/v0',
  },

  staging: {
    isDev: false,
    host: process.env.HOST || 'https://www.myseniorly.com',
    apiUrl: process.env.API_URL || 'https://www.myseniorly.com/v0',
  },

  production: {
    isDev: false,
    isProd: true,
    host: process.env.HOST || 'https://www.seniorly.com',
    apiUrl: process.env.API_URL || 'https://api.seniorly.com/v0',
  },
};

module.exports = merge(config.all, config[config.all.slyEnv]);
