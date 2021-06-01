import { API_CALL } from './actions';

import { logWarn } from 'sly/web/services/helpers/logging';

export default (pendingPromises={}) => next => (action) => {
  const {
    payload: {
      call,
      placeholders,
      options,
      actionName,
      path,
      isJsonApi,
    },
  } = action;

  if (action.type !== API_CALL) {
    return next(action);
  }

  if (!call || !actionName || !placeholders) {
    logWarn(new Error('dispatching undefined action, check redux-bees queries'));
    return Promise.reject();
  }

  const actionKey = `${actionName}#${JSON.stringify(placeholders)}`;

  if (typeof pendingPromises[actionKey] !== 'undefined') {
    return pendingPromises[actionKey];
  }

  const meta = {
    api: true,
    name: actionName,
    params: placeholders,
    isJsonApi: isJsonApi
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
