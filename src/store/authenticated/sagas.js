import { call, put, race, takeEvery, take } from 'redux-saga/effects';

import * as actions from './actions';

export function* authenticate() {
  yield put(actions.authenticate());

  return yield race({
    authenticated: take(actions.AUTHENTICATE_SUCCESS),
    cancel: take(actions.AUTHENTICATE_CANCEL),
  });

}

export function* ensureAuthenticated(api, { action }, { thunk }) {
  const { authenticated, cancel } = yield call(authenticate);

  if (authenticated) {
    yield put(actions.ensureAuthenticatedSuccess(authenticated, thunk));
    yield put(action);
  } else if (cancel) {
    yield put(actions.ensureAuthenticatedFailure(new Error('User canceled'), thunk));
  } else {
    throw new Error('There was an error during authentication');
  }
}

export function* watchEnsureAuthenticated(api, { payload, meta }) {
  yield call(ensureAuthenticated, api, payload, meta);
}

export default function* authenticatedSagas({ api }) {
  yield takeEvery(actions.ENSURE_AUTHENTICATED_REQUEST, watchEnsureAuthenticated, api);
}
