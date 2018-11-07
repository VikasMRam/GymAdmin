
export const ENSURE_AUTHENTICATED = 'ENSURE_AUTHENTICATED';
export const ensureAuthenticated = action => ({
  type: ENSURE_AUTHENTICATED,
  payload: { action },
});

export const TRACK_AUTHENTICATED = 'TRACK_AUTHENTICATED';
export const trackAuthenticated = action => ({
  type: TRACK_AUTHENTICATED,
  payload: { action },
});
