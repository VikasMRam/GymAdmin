import React, { useCallback, useEffect, useMemo } from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/web/config';
import api from 'sly/web/services/api/apiInstance';
import {
  createMemoizedRequestInfoSelector,
} from 'sly/web/services/api/selectors';
import { useApi } from 'sly/web/services/api/context';
import { invalidateRequests } from 'sly/web/services/api/actions';

const defaultDispatcher = call => call();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
}

export function usePrefetch(apiCall, ...args) {
  const { placeholders = {}, options = {} } = api[apiCall].method(...args);
  const argsKey = JSON.stringify(placeholders);

  // FIXME: undo when we have only 1 react app in community profile
  const { /* state, */ state: hookState, dispatch } = useApi();
  const state = isServer ? hookState : apiStore.getState();
  const fetch = useCallback(() => dispatch(
    api[apiCall].asAction(placeholders, options),
  ), [argsKey]);

  const invalidate = useCallback(() => dispatch(
    invalidateRequests(apiCall, placeholders),
  ), [argsKey]);

  const getMemoizedRequestInfo = useMemo(createMemoizedRequestInfoSelector, []);

  const requestInfo = getMemoizedRequestInfo(
    state.requests?.[apiCall]?.[argsKey],
    state.entities,
    api[apiCall].isJsonApi,
  );

  const prefetch = useMemo(() => (
    { requestInfo, fetch, invalidate }
  ), [requestInfo, fetch, invalidate]);

  const { hasStarted, isInvalid } = requestInfo;
  // initial fetch
  // red flag here having a hook inside a conditional, but hoping that it's ok
  // as this branch will always be accessed or not consistently for the env
  if (isServer) {
    const apiContext = useApi();
    const shouldSkip = apiContext.skipApiCalls || api[apiCall].ssrIgnore;
    if (isInvalid || (!shouldSkip && !hasStarted)) {
      fetch();
    }
  } else {
    useEffect(() => {
      if (isInvalid || !hasStarted) {
        fetch();
      }
    }, [requestInfo]);
  }

  return prefetch;
}

function prefetch(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const Wrapper = ({ status = {}, ...props }) => {
      const { requestInfo: request, fetch, invalidate } = usePrefetch(apiCall, ...dispatcher((...args) => args, props));

      const innerProps = {
        ...props,
        [propName]: request.normalized,
        status: {
          ...status,
          [propName]: {
            ...request,
            refetch: fetch,
            invalidate,
          },
        },
      };

      return <InnerComponent {...innerProps} />;
    }

    hoistNonReactStatic(Wrapper, InnerComponent);

    Wrapper.displayName = `prefetch(${getDisplayName(InnerComponent)}, ${propName})`;
    Wrapper.WrappedComponent = InnerComponent;
    Wrapper.propTypes = {
      status: object,
    };

    return Wrapper;
  };
}

export default prefetch;
