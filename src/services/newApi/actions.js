export function invalidateRequests(apiCall, params = null) {
  return {
    type: 'requests/invalidate',
    payload: {
      actionName: apiCall,
      params,
    },
  };
}

export const PURGE_FROM_RELATIONSHIPS = 'PURGE_FROM_RELATIONSHIPS';
// relationship = { name: eg. images, and entity eg. { type, id } }
export function purgeFromRelationships(relationship) {
  return {
    type: PURGE_FROM_RELATIONSHIPS,
    payload: {
      relationship,
    },
  };
}
