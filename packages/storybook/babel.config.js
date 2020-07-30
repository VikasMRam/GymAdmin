const path = require('path');

const commonConfig = require('../../babel.config.js');

// remove the config that's not allowed in extended files
delete commonConfig.babelrcRoots;

module.exports = {
  ...commonConfig,
  plugins: [
    ...commonConfig.plugins,
    // if a unique id is given babel will setup multiple instances of the plugin with all configs.
    // so the common config's alias will also be used.
    ['module-resolver', {
      alias: {
        'react-native': path.join(__dirname, '..', 'mobile', 'node_modules', 'react-native'),
      },
    }, 'native-module-resolver'],
  ],
};
