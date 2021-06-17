import set from 'lodash/set';
import get from 'lodash/get';
import merge from 'lodash/merge';
import unset from 'lodash/unset';
import omit from 'lodash/omit';

import { SET, UNSET, RESET } from './actions';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET: {
      const { data, controller } = payload;
      const prev = get(state, controller);
      const next = Object.assign({}, prev, data);
      set(state, controller, next);
      return Object.assign({}, state);
    }
    case UNSET: {
      const { key, controller } = payload;
      const prev = get(state, controller);
      unset(prev, key);
      const next = merge({}, prev);
      set(state, controller, next);
      return Object.assign({}, state);
    }
    case RESET: {
      const { controller } = payload;
      return omit(state, controller);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
