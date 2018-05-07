// https://github.com/diegohaz/arc/wiki/Actions
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
export const ENTITIES_RECEIVE = 'ENTITIES_RECEIVE';

export const entitiesReceive = (entities,reqMeta) => ({
  type: ENTITIES_RECEIVE,
  payload: entities,
  reqMeta: reqMeta,
});
