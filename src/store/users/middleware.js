// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import normalize from 'json-api-normalizer';
import { env } from 'config';
import { entitiesReceive } from './actions';

const middleware = store => next => (action) => {
  const { type, payload, meta } = action;

  if (type === 'RESOURCE_DETAIL_READ_SUCCESS' && meta.entities === 'users') {
    const { pc, cs } = payload.message.ua_info.um;
    const betterPayload = {
      profilesContacted: pc,
      citySearched: cs,
    };
    action.payload = {
      data: {
        type: 'me',
        id: 'info',
        attributes: betterPayload,
      },
    };
  }

  return next(action);
};

export default middleware;
