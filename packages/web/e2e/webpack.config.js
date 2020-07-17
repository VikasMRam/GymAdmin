const path = require('path');

const SOURCE = 'src';

module.exports = {
  resolve: {
    alias: {
      e2e: path.resolve(__dirname, 'cypress'),
      'sly/common': path.join(path.resolve(__dirname, '..', '..', 'common'), SOURCE),
      'sly/web': path.join(path.resolve(__dirname, '..'), SOURCE),
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
            rootMode: 'upward',
          },
        },
      },
    ],
  },
};
