import { logWarn } from 'sly/services/helpers/logging';
import { API_CALL } from 'sly/services/newApi/constants';

export default () => next => (action) => {
  const { type, payload } = action;

  if (type !== API_CALL) {
    return next(action);
  }

  const { call, args } = payload;

  if (!call || !arguments) {
    logWarn(new Error('dispatching undefined action, check redux-bees queries'));
    return;
  }

  const promise = call(...args);

  const meta = {
    api: true,
    name: promise.actionName,
    params: promise.params,
  };

  next({
    type: `api/${promise.actionName}/request`,
    meta: { ...meta, type: 'request' },
  });

  return promise
    .then((result) => {
      next({
        type: `api/${promise.actionName}/response`,
        payload: result,
        meta: { ...meta, type: 'response' },
      });
      return Promise.resolve(result);
    })
    .catch((result) => {
      next({
        type: `api/${promise.actionName}/error`,
        payload: result,
        meta: { ...meta, type: 'error' },
      });
      return Promise.reject(result);
    });
};
