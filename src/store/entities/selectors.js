// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import build from 'redux-object';
import { denormalize } from 'normalizr';

export const entitiesInitialState = { entities: {} };
export const getEntities = (state = entitiesInitialState) =>
  state.entities || {};

export const initialState = {};
export const getEntity = (state = initialState, entity) =>
  getEntities(state)[entity] || {};

export const getDetail = (state = initialState, entity, id) => {
  const entities = getEntities(state);
  return build(entities, entity, id, { eager: true });
};

export const getList = (state = initialState, entity, ids) => {
  if (!ids) {
    ids = Object.keys(getEntity(state.entities, entity));
  }
  // TODO: put together the relations that exist in the state
  const list = ids.map(id => getDetail(state, entity, id));

  return list;
};
