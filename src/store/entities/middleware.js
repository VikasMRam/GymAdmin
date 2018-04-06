// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload, meta } = action;

  if (meta && meta.entities) {
    const { meta: endpointMeta, ...entities } = normalize(payload, { endpoint: payload.uri });

    if (entities[meta.entities]) {
      store.dispatch(entitiesReceive(entities));
      return next({ ...action, payload: endpointMeta });
    }
  }
  return next(action);
};

export default middleware;
