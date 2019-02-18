const sortChunks = require('webpack-sort-chunks').default;
const flatten = require('lodash/flatten');
const flatMap = require('lodash/flatMap');

const getAssetsByType = (
  assets,
  type,
  prependPath = ''
) => [].concat(assets)
  .filter(p => (new RegExp(`${type}$`).test(p)))
  .map(p => prependPath + p);

/**
 * Save assets by type (js, css)
 */
class AssetsByTypeAndBundlePlugin {
  constructor({ output = {} } = {}) {
    this.options = { output };
  }

  apply(compiler) {
    compiler.plugin('done', (rawStats) => {
      const { output } = compiler.options;
      const stats = rawStats.toJson({ modules: false });
      const chunks = flatten(sortChunks(stats.chunks).map(chunk => chunk.files));
      Object.entries(stats.assetsByChunkName).forEach(([key, files]) => {
        const assets = flatMap([files]).sort((a, b) => chunks.indexOf(b) - chunks.indexOf(a));
        this.options.output[key] = Object.assign({}, this.options.output[key] || {}, {
          assets: {
            js: getAssetsByType(assets, 'js', output.publicPath),
            css: getAssetsByType(assets, 'css', output.publicPath),
          },
        });
      });
    });
  }
}

module.exports = AssetsByTypeAndBundlePlugin;
