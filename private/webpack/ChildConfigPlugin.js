const webpack = require('webpack');

module.exports = class ChildConfigPlugin {
  constructor(config, {
    watch = !!config.watch,
    when = 'done',
    compilerCallback = () => {},
  } = {}) {
    this.watching = false;

    this.options = {
      config, watch, when, compilerCallback,
    };
  }

  apply(compiler) {
    const {
      config, watch, when, compilerCallback,
    } = this.options;

    const plugin = { name: 'ChildConfigPlugin' };

    compiler.hooks[when].tap(plugin, () => {
      if (this.watching) return;
      const child = webpack(config);
      if (watch) {
        child.watch(config.watchOptions || config.watch, compilerCallback);
      } else {
        child.run(compilerCallback);
      }
      this.watching = true;
    });
  }
};
