const { alias } = require('../../../private/generatePackagesPaths');

module.exports = {
  globals: {
    cy: true,
    Cypress: true,
    context: true,
    assert: true
  },
  settings: {
    "import/resolver": {
      "babel-module": {
        alias: {
          ...alias,
          e2e: './cypress',
        }
      }
    }
  }
};
