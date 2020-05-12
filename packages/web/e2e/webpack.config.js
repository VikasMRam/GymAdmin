const path = require('path');

const SOURCE = 'src';

module.exports = {
  resolve: {
    alias: {
      e2e: path.resolve(process.cwd(), 'cypress'),
      'sly/web': path.join(path.resolve(process.cwd(), '..'), SOURCE),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(process.cwd(), '../.babelrc'),
          },
        },
      },
    ],
  },
};
