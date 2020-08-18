const path = require('path');

const commonConfig = require('../../babel.config.js');

// remove the config that's not allowed in extended files
delete commonConfig.babelrcRoots;

module.exports = {
  ...commonConfig,
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...commonConfig.plugins,
    ['transform-inline-environment-variables', {
      include: [
        'IS_STORYBOOK',
        'SLY_ENV',
        'API_URL',
      ],
    }],
    // if a unique id is given babel will setup multiple instances of the plugin with all configs.
    // so the common config's alias will also be used.
    ['module-resolver', {
      alias: {
        '@storybook/react-native': path.resolve(__dirname, '..', 'storybook', 'node_modules', '@storybook/react-native'),
      },
    }, 'storybook/react-native-module-resolver'],
  ],
};
