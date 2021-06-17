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

export function getRelationship(entities, entity, relationshipName, isNormalized) {
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
    return data.map(handle => getEntity(entities, handle, isNormalized));
  }

  return getEntity(entities, data, isNormalized);
}


export function getRequestResult(request, isNormalized) {
  if (!request || !request.response) {
    return null;
  }

  if (Array.isArray(request.response)) {
    return request.response.map(handle => getEntity(request.entities, handle, isNormalized));
  }

  return getEntity(request.entities, request.response, isNormalized);
}

export function getRequestHeaders(request) {
  return (request && request.headers) || {};
}

export function getRequestMeta(request) {
  return request?.meta || {};
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

export const defaultRequest = {
  hasStarted: false,
  isLoading: false,
  isInvalid: false,
  result: null,
  entities: null,
  status: null,
  normalized: null,
  error: null,
  hasFinished: false,
  hasFailed: false,
  headers: {},
  meta: {},
};

export function getRequestInfo(request, isJsonApi = true) {
  const error = request && request.error ? request.error : false;
  const hasStarted = hasRequestStarted(request);
  const isLoading = isRequestLoading(request);

  const normalized = isJsonApi
    ? getRequestResult(request, true)
    : undefined;

  return {
    hasStarted,
    isLoading,
    result: request?.response || null,
    entities: request?.entities || null,
    status: request?.status || null,
    normalized,
    error,
    isInvalid: !!request?.invalid,
    hasFinished: hasStarted && !isLoading,
    hasFailed: !!error,
    headers: getRequestHeaders(request),
    meta: getRequestMeta(request),
  };
}
