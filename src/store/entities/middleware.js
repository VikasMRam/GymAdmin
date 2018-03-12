// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import normalize from 'json-api-normalizer';
import { env } from 'config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload, meta } = action;

  if (meta && meta.entities) {
    const entities = normalize(payload);
    store.dispatch(entitiesReceive(entities));

    if (entities[meta.entities]) {
      const result = Object.values(entities[meta.entities]).map(e => e.id);
      return next({ ...action, payload: result });
    }
  }
  return next(action);
};

export default middleware;
