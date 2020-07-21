const path = require('path');

const mobileConfig = require('../../../mobile/jest.config.js');

const testsRoot = path.resolve(__dirname, '..', '..');

module.exports = {
  ...mobileConfig,
  roots: [testsRoot],
  testMatch: ['**/?(*.)native.test.js'],
};
