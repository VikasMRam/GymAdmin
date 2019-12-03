import build from 'redux-object';
import { createSelector } from 'reselect';

const getRequests = ({ api }) => api.requests;
const getEntities = ({ api }) => api.entities;

function getRawRequest(requests, apiCall, args) {
  if (!requests) {
    return null;
  }

  if (!requests[apiCall]) {
    return null;
  }

  return requests[apiCall][args];
}

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

// TODO: memoize fully from scratch as it's applied externaly

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

  const entities = getEntities(state);

  if (Array.isArray(data)) {
    return data.map(handle => getEntity(entities, handle));
  }

  return getEntity(entities, data);
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
  const argsKey = JSON.stringify(args);
  const requests = getRequests(state);
  const entities = getEntities(state);

  const request = getRawRequest(requests, apiCall, argsKey);
  const error = request && request.error ? request.error : false;
  const hasStarted = hasRequestStarted(request);
  const isLoading = isRequestLoading(request);

  return {
    hasStarted,
    isLoading,
    hasFinished: hasStarted && !isLoading,
    hasFailed: !!error,
    result: getRequestResult(entities, request),
    normalized: getRequestResult(entities, request, true),
    headers: getRequestHeaders(request),
    meta: getRequestMeta(request),
    status: request && request.status,
    error,
  };
}

// MEMOIZATION

const getCall = (_, { call }) => call;
const getArgs = (_, { args }) => JSON.stringify(args);
export const twoSetsAreEqual = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return !a.some((x, i) => x !== b[i]);
  }

  return a === b;
};

// state, apiCall, args
export function createMemoizedRequestInfoSelector() {
  const requestSelector = createSelector(getRequests, getCall, getArgs, getRawRequest);
  let lastRequest = null;
  let lastResult = null;

  return function (state, params = {}) {
    const request = requestSelector(state, params);

    if (request === null || !twoSetsAreEqual(request, lastRequest)) {
      const error = request && request.error ? request.error : false;
      const hasStarted = hasRequestStarted(request);
      const isLoading = isRequestLoading(request);
      const entities = getEntities(state);

      lastRequest = request;
      lastResult = {
        hasStarted,
        isLoading,
        hasFinished: hasStarted && !isLoading,
        hasFailed: !!error,
        result: getRequestResult(entities, request),
        normalized: getRequestResult(entities, request, true),
        headers: getRequestHeaders(request),
        meta: getRequestMeta(request),
        status: request && request.status,
        error,
      };
    }

    return lastResult;
  };
}
