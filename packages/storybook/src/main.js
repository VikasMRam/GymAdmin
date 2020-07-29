const path = require('path');

const packagesPath = path.resolve(__dirname, '..', '..');

module.exports = {
  stories: [
    `${packagesPath}/common/**/*.stories.js`,
    `${packagesPath}/web/**/*.stories.js`,
  ],
  addons: [
    '@storybook/addon-actions/register',
  ],
};
