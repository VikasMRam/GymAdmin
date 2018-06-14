let instance = null;

class ExperimentsApi {
  constructor() {
    if (!instance) {
      instance = this;
      instance.experiments = require('sly/../experiments.json');
    }

    return instance;
  }

  get = (name) => {
    return this.experiments[name];
  }

  all = () => {
    return this.experiments;
  }
}

export default ExperimentsApi;
