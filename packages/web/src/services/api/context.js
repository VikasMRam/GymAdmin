import { object, shape, bool, func } from 'prop-types';
import React, { useContext, useMemo, useState, useCallback } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import mitt from 'mitt';

import createMiddleware from 'sly/web/services/api/middleware';
import apiReducer from 'sly/web/services/api/reducer';
import createApi from 'sly/web/services/api/createApi';
import { invalidateRequests, purgeFromRelationships } from 'sly/web/services/api/actions';

export const apiContextPropType = shape({
  store: object,
  dispatch: func,
  promises: object,
  skipApiCalls: bool,
});

export const ApiContext = React.createContext(null);

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withApiContext(Component) {
  function WithApiContext(props) {
    const apiContext = useContext(ApiContext);
    return (
      <Component {...props} apiContext={apiContext} />
    );
  }

  WithApiContext.displayName = `WithApiContext(${getDisplayName(Component)})`;
  WithApiContext.WrappedComponent = Component.WrappedComponent || Component;
  hoistNonReactStatic(WithApiContext, Component);

  return WithApiContext;
}

export const createStore = (initialState) => {
  let state = initialState;
  const emitter = mitt();
  return {
    getState() {
      return state;
    },
    setState(newState) {
      const oldState = state;
      state = newState;
      Object.entries(newState).forEach(([call, requests]) => {
        Object.entries(requests).forEach(([key, request]) => {
          if (request !== oldState[call]?.[key]) {
            emitter.emit(`${call}#${key}`, request);
          }
        });
      });
    },
    on(call, key, cb) {
      emitter.on(`${call}#${key}`, cb);
    },
    off(call, key, cb) {
      emitter.off(`${call}#${key}`, cb);
    }
  };
};

export const useApi = () => useContext(ApiContext);

export const useSelector = (selector) => {
  const { store } = useApi();
  return useMemo(() => selector(store.getState()), [selector, store]);
};

const defaultPromises = {};
export const ApiProvider = ({
  value: {
    store,
    promises = defaultPromises,
    skipApiCalls = false,
  } = {},
  ...props
}) => {
  const reducerDispatch = useCallback((action) => store.setState(apiReducer(store.getState(), action)), [store]);

  const dispatch = useMemo(
    () => createMiddleware(promises)(reducerDispatch),
    [promises, reducerDispatch],
  );

  const invalidate = useCallback((...args) => dispatch(
    invalidateRequests(...args),
  ), [dispatch]);

  const purgeFromRelationships = useCallback((...args) => dispatch(
    purgeFromRelationships(...args),
  ), [dispatch]);

  const api = useMemo(createApi, []);

  const contextValue = useMemo(() => ({
    store,
    dispatch,
    promises,
    skipApiCalls,
    api,
    invalidate,
    purgeFromRelationships,
  }), [
    store,
    dispatch,
    skipApiCalls,
  ]);

  return (
    <ApiContext.Provider value={contextValue} {...props} />
  );
};

