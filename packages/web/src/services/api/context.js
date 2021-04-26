import { arrayOf, object, shape, bool, func } from 'prop-types';
import React, { useContext, useMemo, useState, useCallback } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import createMiddleware from 'sly/web/services/api/middleware';
import apiReducer from 'sly/web/services/api/reducer';
import createApi from 'sly/web/services/api/createApi';
import { invalidateRequests, purgeFromRelationships } from 'sly/web/services/api/actions';

export const apiContextPropType = shape({
  store: object,
  dispatch: func,
  promises: arrayOf(object),
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
  return {
    getState() {
      return state;
    },
    setState(newState, callback) {
      state = newState;
      if (typeof callback === 'function') {
        callback(state);
      }
    },
  };
};

export const useApi = () => useContext(ApiContext);

export const useSelector = (selector) => {
  const { state } = useApi();
  return useMemo(() => selector(state), [selector, state]);
};

export const ApiProvider = ({
  value: {
    store,
    promises = {},
    skipApiCalls = false,
  } = {},
  ...props
}) => {
  const [state, setState] = useState(store.getState());

  const reducerDispatch = useCallback((action) => store.setState(apiReducer(store.getState(), action), setState), [store.getState()]);

  const dispatch = useMemo(
    () => createMiddleware(promises)(reducerDispatch),
    [promises, reducerDispatch],
  );

  const invalidate = useCallback((...args) => dispatch(
    invalidateRequests(args),
  ), [dispatch]);

  const purgeFromRelationships = useCallback((...args) => dispatch(
    purgeFromRelationships(args),
  ), [dispatch]);

  const api = useMemo(createApi, []);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    promises,
    skipApiCalls,
    api,
    invalidate,
    purgeFromRelationships,
  }), [
    state,
    dispatch,
    promises,
    skipApiCalls,
    invalidate,
    purgeFromRelationships,
  ]);

  return (
    <ApiContext.Provider value={contextValue} {...props} />
  );
};

