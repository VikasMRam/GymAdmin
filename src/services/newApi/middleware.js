import { logWarn } from 'sly/services/helpers/logging';

export default () => next => (promise) => {
  if (!promise) {
    logWarn(new Error('dispatching undefined action, check redux-bees queries'));
    return;
  }

  if (!promise.then) {
    return next(promise);
  }

  if (promise.noop) {
    return;
  }

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
