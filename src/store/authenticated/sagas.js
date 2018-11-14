import { call, put, all, race, takeEvery, take } from 'redux-saga/effects';

import * as actions from './actions';

export function* authenticate() {
  yield put(actions.authenticate());

  const { authenticated } = yield race({
    authenticated: take(actions.AUTHENTICATE_SUCCESS),
    cancel: take(actions.AUTHENTICATE_CANCEL),
  });

  return authenticated;
}

export function* ensureAuthenticated(api, { action }, { thunk }) {
  const authenticated = yield call(authenticate);

  if (authenticated) {
    yield all([
      actions.ensureAuthenticatedSuccess(action, thunk),
      action,
    ]);
  } else {
    yield put(actions.ensureAuthenticatedFailure(action, thunk));
  }
}

export function* watchEnsureAuthenticated(api, { payload, meta }) {
  yield call(ensureAuthenticated, api, payload, meta);
}

export default function* authenticatedSagas({ api }) {
  yield takeEvery(actions.ENSURE_AUTHENTICATED_REQUEST, watchEnsureAuthenticated, api);
}
