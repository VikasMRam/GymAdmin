const commonConfig = require('../../jest.config.js');

module.exports = {
  ...commonConfig,
  rootDir: __dirname,
  preset: 'react-native',
  transform: {
    '^.+\\.(jsx?)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-native)/',
  ],
  moduleNameMapper: {
    ...commonConfig.moduleNameMapper,
    '^react-native$': '<rootDir>/node_modules/react-native',
  },
};
