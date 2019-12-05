import { logWarn } from 'sly/services/helpers/logging';
import { API_CALL } from 'sly/services/newApi/constants';

export default () => next => (action) => {
  const { type, payload } = action;

  if (type !== API_CALL) {
    return next(action);
  }

  const { call, placeholders, options, actionName, path } = payload;

  if (!call || !actionName || !placeholders) {
    logWarn(new Error('dispatching undefined action, check redux-bees queries'));
    return Promise.reject();
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

  return call(path, placeholders, options)
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
    });
};
