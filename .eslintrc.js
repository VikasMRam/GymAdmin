const { alias } = require('./private/generatePackagesPaths');

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb'
  ],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    jest: true,
    node: true
  },
  globals: {
    __DEV__: true,
    __PROD__: true,
    __DEBUG__: true,
    __COVERAGE__: true,
    __BASENAME__: true,
    context: true,
    assert: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      'babel-module': {
        alias,
      }
    }
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'object-curly-newline': 0,
    'max-len': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
    'no-multi-spaces': 0,
    'arrow-body-style': 0,
    'global-require': 0,
    'function-paren-newline': 0,
    'no-param-reassign': 0,
    'no-unused-expressions': 0,
    'no-confusing-arrow': 0,
    'no-unused-vars': [2, { ignoreRestSiblings: true }],
    'no-constant-condition': 0,
    'react/prefer-stateless-function': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default-member': 0,
    'import/prefer-default-export': 0,
    'react/sort-comp': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'react/static-property-placement': 0,
    'react/state-in-constructor': 0,
    'jsx-a11y/anchor-is-valid': [2, {
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight', 'to'],
      aspects: ['noHref', 'invalidHref', 'preferButton']
    }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/first': 0,
    'react/jsx-fragments': [2]
  }
};
