/* eslint-disable no-restricted-syntax,no-continue,no-param-reassign */

const { ConcatSource } = require('webpack-sources');

/**
 * Save assets by type (js, css)
 */
class PrependPlugin {
  constructor({ prepend } = {}) {
    if (typeof prepend !== 'function') {
      throw new Error('prepend should be a function');
    }
    this.options = { prepend };
  }

  apply(compiler) {
    const prependtext = this.options.prepend();
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        chunks.forEach((chunk) => {
          if (!chunk.isInitial()) {
            return;
          }

          for (const file of chunk.files) {
            compilation.assets[file] = new ConcatSource(prependtext, '\n', compilation.assets[file]);
          }
        });
        callback();
      });
    });
  }
}

module.exports = PrependPlugin;
