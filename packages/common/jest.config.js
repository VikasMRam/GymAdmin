const commonConfig = require('../../jest.config.js');

module.exports = {
  ...commonConfig,
  rootDir: __dirname,
  roots: [__dirname],
  testMatch: ['**/?(*.)test.js'],
};
