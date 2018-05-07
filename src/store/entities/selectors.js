// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import build from 'redux-object';
import { denormalize } from 'normalizr';

export const initialState = {};

export const getDetail = (state = initialState, { id, type }) => {
  if (!id) return null;
  return build(state, type, id, { eager: true });
};

export const getList = (state = initialState, { list }) => {
  return list.map(item => getDetail(state, item));
};

