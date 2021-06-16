import React, { useCallback } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { useApi } from 'sly/web/services/api/context';
import { destroy, get } from 'sly/web/services/api/httpMethods';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

export const useQuery = (apiCall) => {
  const { apiClient: { store, api }} = useApi();
  return useCallback((...args) => {
    const call = api[apiCall];

    if ([get, destroy].includes(call.method)) {
      return call(...args);
    }

    const placeholders = args.length >= 2 ? args[0] : {};
    const data = args.length >= 2 ? args[1] : args[0];
    const options = args.length === 3 ? args[2] : {};

    const body = call.isJsonApi
      ? { data }
      : data;

    return store.dispatch(call.asAction(placeholders, body, options));
  }, []);
};

function query(propName, apiCall = propName) {
  return (InnerComponent) => {
    const Wrapper = (props) => {
      // hack to pass dispatch to query children
      // will go away with functional components
      const { apiClient: { store }} = useApi();
      const fetch = useQuery(apiCall);
      const innerProps = {
        ...props,
        dispatch: store.dispatch,
        [propName]: fetch,
      };

      return <InnerComponent {...innerProps} />;
    }

    Wrapper.displayName = `query(${getDisplayName(InnerComponent)}, ${propName})`;
    Wrapper.WrappedComponent = InnerComponent.WrappedComponent || InnerComponent;

    Wrapper.typeHydrationId = InnerComponent.typeHydrationId;
    hoistNonReactStatics(Wrapper, InnerComponent);

    return Wrapper;
  };
}

export default query;
