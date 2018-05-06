// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities

import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload:rawEntities, meta } = action;

  if (meta && meta.thunk && meta.resource) {
    const { uri, path, queryString } = meta.request;

    const { meta: result, ...entities } = normalize(rawEntities, {
      endpoint: uri,
      filterEndpoint: false,
    });

    try {
      store.dispatch(entitiesReceive(entities));
      return next({ ...action, payload: result});
    } catch(e) {
      console.error(e);
      next();
    }
  }

  return next(action);
};

export default middleware;

