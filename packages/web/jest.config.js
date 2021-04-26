const path = require('path');

const commonConfig = require('../../jest.config.js');

const rootPath = path.resolve(__dirname, '..', '..');

module.exports = {
  ...commonConfig,
  rootDir: __dirname,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e',
    '/dist',
  ],
  moduleNameMapper: {
    ...commonConfig.moduleNameMapper,
    '^!raw-loader': path.join(rootPath, 'private/jest/fileMock.js'),
    '^sly/web[/](components|containers)$': path.join(rootPath, 'private/jest/componentsMock.js'),
    '^(store|\\.\\.)\\/selectors$': '<rootDir>/private/jest/selectorsMock.js',
    '^(store|\\.\\.)\\/actions$': '<rootDir>/private/jest/actionsMock.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/private/jest/shim.js',
    '<rootDir>/private/jest/setupTests.js',
  ],
};
