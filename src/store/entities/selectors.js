// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import build from 'redux-object';

export const initialState = {};

export const getDetail = (state = initialState, entity, id) => {
  if (!id) return null;
  return build(state, entity, id, { eager: true });
};

export const getList = (state = initialState, entity, ids = []) => {
  return ids.map(id => getDetail(state, entity, id));
};

export const getDetails = (state = initialState, entity) => {
  if (!state[entity]) return [];
  const ids = Object.keys(state[entity]);
  return ids.map(id => getDetail(state, entity, id));
};
