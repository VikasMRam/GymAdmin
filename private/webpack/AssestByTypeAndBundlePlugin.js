const { join, dirname } = require('path');
const { writeFileSync, existsSync, mkdirSync } = require('fs');

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

const defaultPath = join(process.cwd(), 'assets.[bundle].json');

const ensureDir = (filePath) => {
  const name = dirname(filePath);
  if (!existsSync(name)) {
    mkdirSync(name, { recursive: true });
  }
};

/**
 * Save assets by type (js, css)
 */
class AssetsByTypeAndBundlePlugin {
  constructor({ path = defaultPath } = {}) {
    this.options = { path };
  }

  apply(compiler) {
    compiler.plugin('done', (rawStats) => {
      const { output } = compiler.options;
      const stats = rawStats.toJson({ modules: false });
      const chunks = flatten(sortChunks(stats.chunks).map(chunk => chunk.files));
      Object.entries(stats.assetsByChunkName).forEach(([key, files]) => {
        const assets = flatMap([files]).sort((a, b) => chunks.indexOf(b) - chunks.indexOf(a));
        const assetsByType = {
          js: getAssetsByType(assets, 'js', output.publicPath),
          css: getAssetsByType(assets, 'css', output.publicPath),
        };
        if (this.options.path.indexOf('[bundle]') === -1) {
          throw new Error('assets path must include "[bundle]"');
        }
        const fileName = this.options.path.replace('[bundle]', key);
        console.log(key, fileName);
        ensureDir(fileName);
        writeFileSync(fileName, JSON.stringify(assetsByType));
      });
    });
  }
}

module.exports = AssetsByTypeAndBundlePlugin;
