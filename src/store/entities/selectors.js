// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import build from 'redux-object';
import { denormalize } from 'normalizr';

export const initialState = {};
export const getEntity = (state = initialState, entity) =>
  getEntities(state)[entity] || {};

export const getDetail = (state = initialState, entity, id) => {
  return build(state, entity, id, { eager: true });
};

export const getList = (state = initialState, entity, ids) => {
  return ids.map(id => getDetail(state, entity, id));
};

