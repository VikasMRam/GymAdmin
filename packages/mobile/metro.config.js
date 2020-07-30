/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const fs = require('fs');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  /**
   * Ensure any imports inside the shared 'components' folder resolve to the local node_modules folder
   */
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          const commonPath = path.resolve(__dirname, '..', 'common', 'node_modules', name);
          const rootPath = path.resolve(__dirname, '..', '..', 'node_modules', name);
          if (Object.prototype.hasOwnProperty.call(target, name)) {
            return target[name];
          }
          if (fs.existsSync(commonPath)) {
            return commonPath;
          }
          if (fs.existsSync(rootPath)) {
            return rootPath;
          }
          return path.join(process.cwd(), 'node_modules', name);
        },
      },
    ),
  },
  watchFolders: [
    path.resolve(__dirname, '..'),
    path.resolve(__dirname, '..', '..'),
  ],
};
