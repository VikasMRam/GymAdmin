import { object, shape, bool } from 'prop-types';
import React, { useContext, useMemo, useCallback } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { invalidateRequests, purgeFromRelationships } from 'sly/web/services/api/actions';

export const apiContextPropType = shape({
  apiClient: object,
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

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({
  value: {
    apiClient,
    skipApiCalls = false,
  } = {},
  ...props
}) => {
  const invalidate = useCallback((...args) => apiClient.store.dispatch(
    invalidateRequests(...args),
  ), []);

  const purgeFromRelationships = useCallback((...args) => apiClient.store.dispatch(
    purgeFromRelationships(...args),
  ), []);

  const contextValue = {
    apiClient,
    skipApiCalls,
    invalidate,
    purgeFromRelationships,
  };

  return (
    <ApiContext.Provider value={contextValue} {...props} />
  );
};

