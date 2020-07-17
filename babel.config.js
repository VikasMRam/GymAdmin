const { alias } = require('./private/generatePackagesPaths');

module.exports = {
  babelrcRoots: [
    // Keep the root as a root
    '.',
    // Also consider monorepo packages "root" and load their .babelrc.json files.
    './packages/*',
  ],
  presets: [
    ['@babel/preset-env', {
      modules: false,
      // add based on usage; more info: https://babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins-usage
      useBuiltIns: 'usage',
      // use the reccomended polyfill corejs instead of deprecated @babel/polyfill
      corejs: 3,
    }],
    '@babel/preset-react',
  ],
  plugins: [
    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    '@babel/plugin-proposal-do-expressions',

    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],

    'transform-export-extensions',

    ['styled-components', {
      ssr: true,
    }],
    '@babel/plugin-syntax-dynamic-import',

    ['module-resolver', {
      alias,
    }],
  ],
  env: {
    development: {
      plugins: [
        ['styled-components', {
          displayName: true,
          minify: false,
          transpileTemplateLiterals: false,
        }],
      ],
    },
    test: {
      // if a unique id is given babel will setup multiple instances of the plugin with all configs.
      // so the common config's presets will also be used.
      presets: [
        ['@babel/preset-env', {
          // more info: https://stackoverflow.com/questions/60337983/syntaxerror-cannot-use-import-statement-outside-a-module-with-babel-jest-an
          modules: 'auto',
        }, 'jest'],
      ],
      plugins: [
        'babel-plugin-dynamic-import-node',
        'transform-es2015-modules-commonjs',
        ['styled-components', {
          fileName: false,
          minify: false,
        }],
      ],
    },
    staging: {
      plugins: [
        // 'transform-react-remove-prop-types',
      ],
    },
    production: {
      plugins: [
        // 'transform-react-remove-prop-types',
      ],
    },
  },
};
