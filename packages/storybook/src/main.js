const path = require('path');

const baseWebpackConfig = require('../../web/webpack.config')[0];

const packagesPath = path.resolve(__dirname, '..', '..');

module.exports = {
  stories: [
    `${packagesPath}/common/**/*.stories.js`,
    `${packagesPath}/web/**/*.stories.js`,
  ],
  addons: [
    '@storybook/addon-actions/register',
  ],
  webpackFinal: config => ({
    ...config,
    resolve: {
      ...config.resolve,
      ...baseWebpackConfig.resolve,
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        ...baseWebpackConfig.module.rules.slice(1),
      ],
    },
  }),
};
