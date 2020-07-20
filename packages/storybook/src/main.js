const path = require('path');

const packagesPath = path.resolve(__dirname, '..', '..');

module.exports = {
  stories: [`${packagesPath}/**/*.stories.js`],
  addons: [
    '@storybook/addon-actions/register',
  ],
};
