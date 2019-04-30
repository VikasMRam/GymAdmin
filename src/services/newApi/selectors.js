import build from 'redux-object';

function getRawRequest(state, apiCall, args) {
  if (!state.bees.requests) {
    return null;
  }

  if (!state.bees.requests[apiCall]) {
    return null;
  }

  return state.bees.requests[apiCall][JSON.stringify(args)];
}

export function getEntity(state, handle, isNormalized) {
  if (!handle) {
    return null;
  }

  if (!state.bees.entities) {
    return null;
  }

  if (!state.bees.entities[handle.type]) {
    return null;
  }

  return isNormalized ? build(state.bees.entities, handle.type, handle.id, { eager: true }) : state.bees.entities[handle.type][handle.id];
}

export function getRelationship(state, entity, relationshipName) {
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
    return data.map(handle => getEntity(state, handle));
  }

  return getEntity(state, data);
}


export function getRequestResult(state, request, isNormalized) {
  if (!request || !request.response) {
    return null;
  }

  if (Array.isArray(request.response)) {
    return request.response.map(handle => getEntity(state, handle, isNormalized));
  }

  return getEntity(state, request.response, isNormalized);
}

export function getRequestHeaders(request) {
  return request && request.headers;
}

export function getRequestMeta(request) {
  return request && request.meta;
}

export function isRequestLoading(request) {
  return request && request.isLoading ? true : false;
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

export function getRequestInfo(state, apiCall, args) {
  const request = getRawRequest(state, apiCall, args);
  const error = request && request.error ? request.error : false;

  return {
    hasStarted: hasRequestStarted(request),
    isLoading: isRequestLoading(request),
    hasFailed: !!error,
    result: getRequestResult(state, request),
    normalized: getRequestResult(state, request, true),
    headers: getRequestHeaders(request),
    meta: getRequestMeta(request),
    status: request && request.status,
    error,
  };
}
