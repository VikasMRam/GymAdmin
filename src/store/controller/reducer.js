import { SET, UNSET } from './actions';
import set from 'lodash/set';
import unset from 'lodash/unset';

export default (state={}, { type, payload }) => {
  switch(type) {
    case SET: {
      const { key, value } = payload;
      set(state, key, value);
    }
    case UNSET: {
      const { key } = payload;
      unset(state, key);
    }
  }
  return state;
}

