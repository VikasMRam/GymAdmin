const baseConfig = require('../../webpack.config')[0];

module.exports = async ({ config }) => {
  config.resolve.alias = baseConfig.resolve.alias;
  config.resolve.modules = baseConfig.resolve.modules;

  config.module.rules = [
    ...config.module.rules,
    ...baseConfig.module.rules.slice(1),
  ];

  return config;
};
