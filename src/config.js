const merge = require('lodash/merge');

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    basename: process.env.BASENAME || '',
    host: process.env.HOST || 'www.lvh.me',
    port: process.env.PORT || 8000,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: 'http://www.lvh.me/v0',
    authTokenUrl: 'http://www.lvh.me/users/auth_token',
    publicPath: process.env.PUBLIC_PATH || '',
  },
  test: {},
  development: {},
  staging: {
    apiUrl: process.env.API_URL || 'http://www.myseniorly.com/v0',
    authTokenUrl: process.env.AUTH_URL  || 'http://www.myseniorly.com/users/auth_token',
  },
  production: {
    host: process.env.HOST || 'seniorly.com',
    port: process.env.PORT || 8080,
    apiUrl: process.env.API_URL || 'https://www.seniorly.com/v0/',
    authTokenUrl: process.env.AUTH_URL ||  'https://www.seniorly.com/users/auth_token',
  },
};

module.exports = merge(config.all, config[config.all.env]);
