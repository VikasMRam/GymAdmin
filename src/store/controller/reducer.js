import { SET, UNSET } from './actions';
import set from 'lodash/set';
import get from 'lodash/get';
import merge from 'lodash/merge';
import unset from 'lodash/unset';

export default (state={}, { type, payload }) => {
  switch(type) {
    case SET: {
      const { data, controller } = payload;
      const prev = get(state, controller);
      const next = merge(prev, data);
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
  }
  return state;
}

