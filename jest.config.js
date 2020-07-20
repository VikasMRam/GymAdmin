const path = require('path');

const { moduleNameMapper } = require('./private/generatePackagesPaths');

module.exports = {
  moduleDirectories: [
    'src',
    'private',
    'node_modules',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  transform: {
    '^.+\\.jsx?$': ['babel-jest', { rootMode: 'upward' }],
  },
  moduleNameMapper: {
    ...moduleNameMapper,
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      path.join(__dirname, 'private/jest/fileMock.js'),
  },
  verbose: true,
  reporters: [
    'default',
    'jest-junit',
  ],
  setupFiles: [
    path.join(__dirname, 'private/jest/setupTests.js'),
  ],
};
