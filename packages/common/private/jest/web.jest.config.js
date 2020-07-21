const path = require('path');

const webConfig = require('../../../web/jest.config.js');

const testsRoot = path.resolve(__dirname, '..', '..');

module.exports = {
  ...webConfig,
  roots: [testsRoot],
  testMatch: ['**/?([^n][^a][^t][^i][^v][^e])test.js'],
};

