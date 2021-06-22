import mitt from 'mitt';

import createMiddleware from 'sly/web/services/api/middleware';
import apiReducer from 'sly/web/services/api/reducer';
import apiEndpoints from 'sly/web/services/api/endpoints';
import buildApi from 'sly/web/services/api/buildApi';
import { apiUrl } from 'sly/web/config';

const createStore = (initialState={}, promises={}) => {
  let state = initialState;
  const emitter = mitt();

  const setState = (newState) => {
    const oldState = state;
    state = newState;
    Object.entries(newState).forEach(([call, requests]) => {
      Object.entries(requests).forEach(([key, request]) => {
        if (request !== oldState[call]?.[key]) {
          emitter.emit(`${call}#${key}`, request);
        }
      });
    });
  };

  const next = action => setState(apiReducer(state, action));
  const dispatch = createMiddleware(promises, next);

  return {
    dispatch,
    setState,
    promises,

    getState() {
      return state;
    },

    on(call, key, cb) {
      emitter.on(`${call}#${key}`, cb);
    },

    off(call, key, cb) {
      emitter.off(`${call}#${key}`, cb);
    }
  };
};

export default function createApiClient (options = {}) {
  const api = buildApi(apiEndpoints, {
    baseUrl: apiUrl,
    configureOptions: options => ({
      ...options,
      redirect: 'manual',
      credentials: 'include',
    }),
  });

  const store = createStore(options.initialState, options.promises)

  return {
    api,
    store,
  };
}
