export const ENSURE_AUTHENTICATED = 'ENSURE_AUTHENTICATED';
export const ensureAuthenticated = action => ({
  type: ENSURE_AUTHENTICATED,
  payload: { action },
  meta: {
    thunk: 'ensureAuthenticated',
  },
});

export const ENSURE_AUTHENTICATED_SUCCESS = 'ENSURE_AUTHENTICATED_SUCCESS';
export const ensureAuthenticatedSuccess = (action, thunk) => ({
  type: ENSURE_AUTHENTICATED_SUCCESS,
  payload: { action },
  meta: {
    thunk,
  },
});

