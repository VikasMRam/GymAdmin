export const ENSURE_AUTHENTICATED_REQUEST = 'ENSURE_AUTHENTICATED_REQUEST';
export const ensureAuthenticated = action => ({
  type: ENSURE_AUTHENTICATED_REQUEST,
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

export const ENSURE_AUTHENTICATED_FAILURE = 'ENSURE_AUTHENTICATED_FAILURE';
export const ensureAuthenticatedFailure = (error, thunk) => ({
  type: ENSURE_AUTHENTICATED_FAILURE,
  error: true,
  payload: error,
  meta: {
    thunk,
  },
});

// AUTHENTICATE FLOW

export const AUTHENTICATE = 'AUTHENTICATE';
export const authenticate = () => ({
  type: AUTHENTICATE,
});

export const AUTHENTICATE_CANCEL = 'AUTHENTICATE_CANCEL';
export const authenticateCancel = () => ({
  type: AUTHENTICATE_CANCEL,
});

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const authenticateSuccess = () => ({
  type: AUTHENTICATE_SUCCESS,
});

