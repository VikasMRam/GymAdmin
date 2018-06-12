import { SET, UNSET } from './actions';
import set from 'lodash/set';
import unset from 'lodash/unset';

export default (state={}, { type, payload }) => {
  switch(type) {
    case SET: {
      const { key: innerKey, value, controller } = payload;
      const key = `${controller}.${innerKey}`;
      set(state, key, value);
    }
    case UNSET: {
      const { key: innerKey, controller } = payload;
      const key = `${controller}.${innerKey}`;
      unset(state, key);
    }
  }
  return state;
}

