import { call, put, race, takeEvery, take, select } from 'redux-saga/effects';

import * as actions from './actions';

import { isFSA } from 'sly/store/actions';
import { createMemoizedRequestInfoSelector } from 'sly/services/api';


const getMemoizedRequestInfo = createMemoizedRequestInfoSelector();
const getUser = state => getMemoizedRequestInfo(state, { call: 'getUser', args: { id: 'me' } });

export function* authenticate(reason, options) {
  // check if there is an user
  const user = yield select(getUser);
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

export function* ensureAuthenticated(api, { reason, action, options }, { thunk }) {
  const { authenticated, cancel } = yield call(authenticate, reason, options);
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

export function* forAuthenticated(api, { action }, { thunk }) {
  const user = yield select(getUser);
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

export function* watchEnsureAuthenticated(api, { payload, meta }) {
  yield call(ensureAuthenticated, api, payload, meta);
}

export function* watchForAuthenticated(api, { payload, meta }) {
  yield call(forAuthenticated, api, payload, meta);
}

export default function* authenticatedSagas({ api }) {
  yield takeEvery(actions.ENSURE_AUTHENTICATED, watchEnsureAuthenticated, api);
  yield takeEvery(actions.FOR_AUTHENTICATED, watchForAuthenticated, api);
}
