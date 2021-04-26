import { logWarn } from 'sly/web/services/helpers/logging';
import { API_CALL } from 'sly/web/services/api/constants';

export default (pendingPromises={}) => next => (action) => {
  const { type, payload } = action;

  if (type !== API_CALL) {
    return next(action);
  }

  const { call, placeholders, options, actionName, path } = payload;

  if (!call || !actionName || !placeholders) {
    logWarn(new Error('dispatching undefined action, check redux-bees queries'));
    return Promise.reject();
  }

  const actionKey = `${actionName}:${JSON.stringify(placeholders)}`;

  if (typeof pendingPromises[actionKey] !== 'undefined') {
    return pendingPromises[actionKey];
  }

  const meta = {
    api: true,
    name: actionName,
    params: placeholders,
  };

  next({
    type: `api/${actionName}/request`,
    meta: { ...meta, type: 'request' },
  });

  const promise = call(path, placeholders, options)
    .then((result) => {
      next({
        type: `api/${actionName}/response`,
        payload: result,
        meta: { ...meta, type: 'response' },
      });
      return Promise.resolve(result);
    })
    .catch((result) => {
      next({
        type: `api/${actionName}/error`,
        payload: result,
        meta: { ...meta, type: 'error' },
      });
      return Promise.reject(result);
    })
    .finally(() => {
      delete pendingPromises[actionKey];
    });

  pendingPromises[actionKey] = promise;

  return promise;
};
