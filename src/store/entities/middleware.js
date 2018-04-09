// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload: rawEntities, meta } = action;

  if (meta && meta.entities) {
    const { uri } = meta.request;
    const qsPos = uri.indexOf('?');
    const key =  qsPos !== -1
      ? uri.substring(0, qsPos)
      : uri; 
    const { meta: result, ...entities } = normalize(rawEntities, { 
      endpoint: key,
    }); 

    if (entities[meta.entities]) {
      store.dispatch(entitiesReceive(entities));
      return next({ ...action, payload: result[key].data });
    } else {
      throw new Error(`Posibly malformed response with type: ${meta.entities}`); 
    }
  }

  return next(action);
};

export default middleware;
