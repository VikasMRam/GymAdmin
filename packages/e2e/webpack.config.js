const path = require('path');

const { alias } = require('../../private/generatePackagesPaths');

module.exports = {
  resolve: {
    alias: {
      ...alias,
      e2e: path.resolve(__dirname, 'cypress'),
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
