// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities

import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload:rawEntities, meta } = action;

  if (meta && meta.entities) {
    console.log(action.type, action);
    const { uri, path, queryString } = meta.request;

    const { meta: result, ...entities } = normalize(rawEntities, {
      endpoint: uri,
      filterEndpoint: false,
    });

    if (entities[meta.entities]) {
      store.dispatch(entitiesReceive(entities));
      const ids = result[path][queryString].data.map(({id})=>id);
      return next({ ...action, payload: result});
    } else {
      throw new Error(`Possibly malformed response with type: ${meta.entities}`);
    }
  }

  return next(action);
};

export default middleware;

