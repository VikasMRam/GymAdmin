import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { object } from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { isServer } from 'sly/web/config';
import api from 'sly/web/services/api/apiInstance';
import { hasSession } from 'sly/web/services/api/helpers';
import { defaultRequest, getRelationship as selectRelationship } from 'sly/web/services/api/selectors';
import { useApi } from 'sly/web/services/api/context';
import { invalidateRequests, purgeFromRelationships as purgeFromRelationshipsAction } from 'sly/web/services/api/actions';

const defaultDispatcher = call => call();

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';
}

export function usePrefetch(apiCall, ...args) {
  const { placeholders = {}, options = {} } = api[apiCall].method(...args);
  const argsKey = JSON.stringify(placeholders);

  const { store, dispatch, skipApiCalls } = useApi();
  const fetch = useCallback(() => dispatch(
    api[apiCall].asAction(placeholders, options),
  ), [apiCall, argsKey]);

  const invalidate = useCallback(() => dispatch(
    invalidateRequests(apiCall, placeholders),
  ), [apiCall, argsKey]);

  const purgeFromRelationships = useCallback((relationship) => dispatch(
    purgeFromRelationshipsAction(apiCall, placeholders, relationship),
  ), [apiCall, argsKey]);

  const getCurrentRequestInfo = useCallback(() => store.getState()[apiCall]?.[argsKey], [apiCall, argsKey]);

  const [request, setRequest] = useState(getCurrentRequestInfo() || { ...defaultRequest });

  const getRelationship = useCallback((entity, relationship) => selectRelationship(request.entities, entity, relationship), [request]);

  const shouldBail = options.sessionOnly && !hasSession();

  useEffect(() => {
    store.on(apiCall, argsKey, setRequest);
    const currentRequest = getCurrentRequestInfo() || defaultRequest;
    if (!shouldBail && currentRequest !== request) {
      fetch();
    }
    return () => store.off(apiCall, argsKey, setRequest);
  }, [apiCall, argsKey, shouldBail]);

  const prefetch = useMemo(() => (
    { requestInfo: request, fetch, invalidate, getRelationship, purgeFromRelationships, getCurrentRequestInfo }
  ), [request, apiCall, argsKey]);

  // initial server fetch, server does not run the effects
  if (isServer) {
    const { hasStarted, isInvalid } = request;
    const shouldSkip = skipApiCalls || api[apiCall].ssrIgnore;
    if (isInvalid || (!shouldSkip && !hasStarted)) {
      fetch();
    }
  }

  return prefetch;
}

function prefetch(propName, apiCall, dispatcher = defaultDispatcher) {
  return (InnerComponent) => {
    const Wrapper = ({ status = {}, ...props }) => {
      const { requestInfo: request, fetch, invalidate, getRelationship, purgeFromRelationships } = usePrefetch(apiCall, ...dispatcher((...args) => args, props));

      const innerProps = {
        ...props,
        [propName]: request.normalized,
        status: {
          ...status,
          [propName]: {
            ...request,
            refetch: fetch,
            invalidate,
            getRelationship,
            purgeFromRelationships,
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
