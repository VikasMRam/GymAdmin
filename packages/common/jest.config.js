const commonConfig = require('../../jest.config.js');

module.exports = {
  ...commonConfig,
  rootDir: __dirname,
  projects: [
    '<rootDir>/private/jest/web.jest.config.js',
    '<rootDir>/private/jest/mobile.jest.config.js',
  ],
};
