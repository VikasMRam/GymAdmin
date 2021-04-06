import { system } from 'sly/common/system/system';

const defaults = {
  snap: {
    top: {
      borderTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
    bottom: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    left: {
      borderLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    right: {
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
    },
    all: {
      border: 0,
      borderRadius: 0,
    },
  },
};

const configs = {
  snap: {
    defaultScale: defaults.snap,
  },
};


const snap = system(configs);

export default snap;
