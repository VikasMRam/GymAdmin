// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities

import normalize from 'json-api-normalizer';
import { env } from 'sly/config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { payload:rawEntities, meta } = action;

  if (meta && meta.entities) {
    const { uri } = meta.request;
    const qsPos = uri.indexOf('?');
    const key =  qsPos !== -1 ? uri.substring(0,qsPos) : uri;

    const { meta: result, ...entities } = normalize(rawEntities, {
      endpoint: key,
    });

    // hack as id is not 'me' 
    store.dispatch(entitiesReceive(entities));
    const data = result[key].data;
    const ids = data.map(({id})=>id);

    if (meta.entities === 'user' && meta.request.needle === 'me') {
      const { user } = entities; 
      const [id] = ids;
      store.dispatch(entitiesReceive({
        user: {
          me: user[id],
        }
      }));
    }
    return next({ ...action, payload: { ids, meta: rawEntities.meta }});
  }

  return next(action);
};

export default middleware;

