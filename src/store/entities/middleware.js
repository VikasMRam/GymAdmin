// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities

import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload:rawEntities, meta } = action;

  if (meta && meta.entities) {
    const { uri } = meta.request;
    const qsPos = uri.indexOf('?');
    const path =  qsPos !== -1 ? uri.substring(0, qsPos) : uri;
    const key =  qsPos !== -1 ? uri.substring(qsPos) : '';

    const { meta: result, ...entities } = normalize(rawEntities, {
      endpoint: uri,
      filterEndpoint: false,
    }); // { meta :...., key1,;

    console.log(action.type, result);

    if (entities[meta.entities]) {
      store.dispatch(entitiesReceive(entities));
      const ids = result[path][key].data.map(({id})=>id);
      return next({ ...action, payload: ids});
    } else {
      throw new Error(`Possibly malformed response with type: ${meta.entities}`);
    }
  }

  return next(action);
};

export default middleware;

