export const ENSURE_AUTHENTICATED = 'ENSURE_AUTHENTICATED';
export const FOR_AUTHENTICATED = 'FOR_AUTHENTICATED';
export const ensureAuthenticated = (reason, action) => {
  // default reason
  if (action === undefined) {
    action = reason;
  }
  const payload = typeof reason === 'object'
    ? { options: reason, action }
    : { reason, action, options: {} };

  return {
    type: ENSURE_AUTHENTICATED,
    payload,
    meta: {
      thunk: 'ensureAuthenticated',
    },
  };
};

export const forAuthenticated = (action) => {
  return {
    type: FOR_AUTHENTICATED,
    payload: { action },
    meta: {
      thunk: 'forAuthenticated',
    },
  };
};

export const FOR_AUTHENTICATED_SUCCESS = 'FOR_AUTHENTICATED_SUCCESS';
export const forAuthenticatedSuccess = (result, thunk) => ({
  type: FOR_AUTHENTICATED_SUCCESS,
  payload: result,
  meta: {
    thunk,
  },
});

export const FOR_AUTHENTICATED_FAILURE = 'FOR_AUTHENTICATED_FAILURE';
export const forAuthenticatedFailure = (error, thunk) => ({
  type: FOR_AUTHENTICATED_FAILURE,
  error: true,
  payload: error,
  meta: {
    thunk,
  },
});

export const ENSURE_AUTHENTICATED_SUCCESS = 'ENSURE_AUTHENTICATED_SUCCESS';
export const ensureAuthenticatedSuccess = (result, thunk) => ({
  type: ENSURE_AUTHENTICATED_SUCCESS,
  payload: result,
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
export const authenticate = (reason, options) => ({
  type: AUTHENTICATE,
  payload: { reason, options },
});

export const AUTHENTICATE_CANCEL = 'AUTHENTICATE_CANCEL';
export const authenticateCancel = () => ({
  type: AUTHENTICATE_CANCEL,
});

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const authenticateSuccess = () => ({
  type: AUTHENTICATE_SUCCESS,
});

