import build from 'redux-object';

export function getEntity(entities, handle, isNormalized) {
  if (!handle) {
    return null;
  }

  if (!entities) {
    return null;
  }

  if (!entities[handle.type]) {
    return null;
  }

  return isNormalized ? build(entities, handle.type, handle.id, { eager: true }) : entities[handle.type][handle.id];
}

export function getRelationship(state, entity, relationshipName, isNormalized) {
  if (!entity) {
    return null;
  }

  if (!entity.relationships) {
    return null;
  }

  if (!entity.relationships[relationshipName]) {
    return null;
  }

  const { data } = entity.relationships[relationshipName];

  if (Array.isArray(data)) {
    return data.map(handle => getEntity(state.entities, handle, isNormalized));
  }

  return getEntity(state.entities, data, isNormalized);
}


export function getRequestResult(entities, request, isNormalized) {
  if (!request || !request.response) {
    return null;
  }

  if (Array.isArray(request.response)) {
    return request.response.map(handle => getEntity(entities, handle, isNormalized));
  }

  return getEntity(entities, request.response, isNormalized);
}

export function getRequestHeaders(request) {
  return (request && request.headers) || {};
}

export function getRequestMeta(request) {
  return request && request.meta;
}

export function isRequestLoading(request) {
  return !!(request && request.isLoading);
}

export function hasRequestStarted(request) {
  if (!request) {
    return false;
  }

  if (request.invalid) {
    return false;
  }

  return true;
}

// MEMOIZATION

export const twoSetsAreEqual = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return !a.some((x, i) => x !== b[i]);
  }

  return a === b;
};

export function getRequestInfo(request, entities, isJsonApi = true) {
  const error = request && request.error ? request.error : false;
  const hasStarted = hasRequestStarted(request);
  const isLoading = isRequestLoading(request);


  const result = isJsonApi
    ? getRequestResult(entities, request)
    : request?.response;

  const normalized = isJsonApi
    ? getRequestResult(entities, request, true)
    : request?.response;

  return {
    hasStarted,
    isLoading,
    result,
    normalized,
    error,
    isInvalid: request?.invalid,
    hasFinished: hasStarted && !isLoading,
    hasFailed: !!error,
    headers: getRequestHeaders(request),
    meta: getRequestMeta(request),
    status: request?.status,
  };
}
// state, apiCall, args
export function createMemoizedRequestInfoSelector() {
  let lastRequestInfo = null;
  let lastRequest;

  return function getMemoizedRequestInfo(request, entities, isJsonApi) {
    if (typeof lastRequest === 'undefined' || request !== lastRequest) {
      lastRequest = request;
      lastRequestInfo = getRequestInfo(request, entities, isJsonApi);
    }

    return lastRequestInfo;
  };
}
