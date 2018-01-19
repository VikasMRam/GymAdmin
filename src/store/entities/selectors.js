// https://github.com/diegohaz/arc/wiki/Selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import build from 'redux-object'
import { denormalize } from 'normalizr'
// import * as schemas from './schemas'
//
export const initialState = {}
//
export const getEntity = (state = initialState, entity) => state[entity] || {}

export const getDetail = (state = initialState, entity, id) => build(state, entity, id, { eager: true })//getEntity(state, entity)[id]

export const getList = (state = initialState, entity, ids) => {
  if (!ids) {
    ids = Object.keys(getEntity(state.entities, entity));
  }
  // TODO: put together the relations that exist in the state
  const list = ids.map(id => getDetail(state.entities, entity, id));

  return list;
};

// export const getDenormalizedDetail = (state = initialState, entity, id) =>
//   denormalize(getDetail(state, entity, id), schemas[entity], state)

// export const getDenormalizedList = (state = initialState, entity, ids) =>
//   denormalize(getList(state, entity, ids), [schemas[entity]], state)
