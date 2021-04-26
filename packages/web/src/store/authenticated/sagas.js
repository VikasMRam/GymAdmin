import { call, put, race, takeEvery, take, select } from 'redux-saga/effects';

import * as actions from './actions';

import { isFSA } from 'sly/web/store/actions';
import { createMemoizedRequestInfoSelector } from 'sly/web/services/api';

const getMemoizedRequestInfo = createMemoizedRequestInfoSelector();
const getUser = state => getMemoizedRequestInfo(
  state.requests?.['getUser']?.['{"id":"me"}'],
  state.entities,
);

export function* authenticate(apiStore, reason, options) {
  // check if there is an user
  const user = getUser(apiStore.getState());
  if (user.status === 200) {
    return {
      authenticated: true,
      cancel: null,
    };
  }

  // otherwise start the login process
  yield put(actions.authenticate(reason, options));
  return yield race({
    authenticated: take(actions.AUTHENTICATE_SUCCESS),
    cancel: take(actions.AUTHENTICATE_CANCEL),
  });
}

export function* ensureAuthenticated(apiStore, { reason, action, options }, { thunk }) {
  const { authenticated, cancel } = yield call(authenticate, apiStore, reason, options);
  if (authenticated) {
    try {
      let result;
      // double yield in case there is a promise in the return,
      // in reality the ensureAuthenticated action has already
      // succeeded, but we have to return an error if the underlying
      // action fails
      if (isFSA(action)) {
        result = yield yield put(action);
      } else if (typeof action === 'function') {
        result = yield yield call(action);
      } else if (action) {
        throw new Error(`Unknown action type for ${JSON.stringify(action)}`);
      }
      yield put(actions.ensureAuthenticatedSuccess(result, thunk));
    } catch (e) {
      yield put(actions.ensureAuthenticatedFailure(e, thunk));
    }
  } else if (cancel) {
    yield put(actions.ensureAuthenticatedFailure(new Error('User canceled'), thunk));
  } else {
    throw new Error('There was an error during authentication');
  }
}

export function* forAuthenticated(apiStore, { action }, { thunk }) {
  const user = getUser(apiStore.getState());
  if (user) {
    try {
      let result;
      // double yield in case there is a promise in the return,
      // see ensureAuthenticated comment
      if (isFSA(action)) {
        result = yield yield put(action);
      } else if (typeof action === 'function') {
        result = yield put(yield call(action));
      } else {
        throw new Error(`Unknown action type for ${JSON.stringify(action)}`);
      }
      yield put(actions.forAuthenticatedSuccess(result, thunk));
    } catch (e) {
      yield put(actions.forAuthenticatedFailure(e, thunk));
    }
  } else {
    yield put(actions.forAuthenticatedSuccess(null, thunk));
  }
}

export function* watchEnsureAuthenticated(apiStore, { payload, meta }) {
  yield call(ensureAuthenticated, apiStore, payload, meta);
}

export function* watchForAuthenticated(apiStore, { payload, meta }) {
  yield call(forAuthenticated, apiStore, payload, meta);
}

export default function* authenticatedSagas({ apiStore }) {
  yield takeEvery(actions.ENSURE_AUTHENTICATED, watchEnsureAuthenticated, apiStore);
  yield takeEvery(actions.FOR_AUTHENTICATED, watchForAuthenticated, apiStore);
}
