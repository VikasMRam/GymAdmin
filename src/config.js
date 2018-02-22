const merge = require('lodash/merge')

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    basename: process.env.PUBLIC_PATH,
    host: process.env.HOST || 'www.lvh.me',
    port: process.env.PORT || 8000,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    apiUrl: 'http://www.lvh.me/v0',
    authTokenUrl: 'http://www.lvh.me/users/auth_token',
  },
  test: {},
  development: {},
  staging: {
    apiUrl: 'http://www.teamseniorly.com/v0',
    authTokenUrl: 'http://www.teamseniorly.com/users/auth_token',
  },
  production: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    apiUrl: 'http://www.lvh.me/v0',
  },
}

module.exports = merge(config.all, config[config.all.env])
