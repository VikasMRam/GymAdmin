const { join, dirname } = require('path');
const { writeFileSync, existsSync, mkdirSync } = require('fs');

const sortChunks = require('webpack-sort-chunks').default;
const flatten = require('lodash/flatten');
const flatMap = require('lodash/flatMap');
const cloneDeep = require('lodash/cloneDeep');

const getAssetsByType = (
  assets,
  type,
  prependPath = ''
) => [].concat(assets)
  .filter(p => (new RegExp(`${type}$`).test(p)))
  .map(p => prependPath + p);

const defaultPath = join(process.cwd(), 'assets.json');

const ensureDir = (filePath) => {
  const name = dirname(filePath);
  if (!existsSync(name)) {
    mkdirSync(name, { recursive: true });
  }
};

/**
 * Save assets by type (js, css)
 */
module.exports = class AssetsByTypeAndBundlePlugin {
  constructor({ path = defaultPath, clientConfigs = [] } = {}) {
    if (!Array.isArray(clientConfigs)) {
      throw new Error('clientConfigs should be array');
    }
    this.options = { path, clientConfigs };
  }

  apply(compiler) {
    const plugin = { name: 'AssetsByTypeAndBundlePlugin' };
    compiler.hooks.done.tap(plugin, (rawStats) => {
      const { output } = compiler.options;
      const stats = rawStats.toJson({ modules: false });
      const chunks = flatten(sortChunks(stats.chunks).map(chunk => chunk.files));
      const assetsByBundle = cloneDeep(this.options.clientConfigs);
      Object.entries(stats.assetsByChunkName).forEach(([key, files]) => {
        const assets = flatMap([files]).sort((a, b) => chunks.indexOf(b) - chunks.indexOf(a));
        const clientConfig = assetsByBundle.find(({ bundle }) => bundle === key);
        if (typeof clientConfig.assets !== 'undefined') {
          throw new Error(`clientConfig.assets already exist for key: ${key}`);
        }
        clientConfig.assets = {
          js: getAssetsByType(assets, 'js', output.publicPath),
          css: getAssetsByType(assets, 'css', output.publicPath),
        };
      });
      ensureDir(this.options.path);
      writeFileSync(this.options.path, JSON.stringify(assetsByBundle, null, 2));
    });
  }
};
