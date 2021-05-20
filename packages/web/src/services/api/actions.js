export const INVALIDATE = 'INVALIDATE';
export function invalidateRequests(apiCall, params = null) {
  return {
    type: INVALIDATE,
    payload: {
      actionName: apiCall,
      params,
    },
  };
}

export const PURGE_FROM_RELATIONSHIPS = 'PURGE_FROM_RELATIONSHIPS';
// relationship = { name: eg. images, and entity eg. { type, id } }
export function purgeFromRelationships(call, params, relationship) {
  return {
    type: PURGE_FROM_RELATIONSHIPS,
    payload: {
      actionName: call,
      params,
      relationship,
    },
  };
}

export const API_CALL = 'SLY_API_CALL';
export function apiCall(call, params) {
  const { placeholders, path, options, actionName } = params;

  return ({
    type: API_CALL,
    payload: {
      call,
      path,
      placeholders,
      options,
      actionName,
    },
  });
}

