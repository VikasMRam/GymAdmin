import { call, delay, takeEvery } from 'redux-saga';

import * as actions from 'sly/store/authenticated/actions';

export function* ensureAuthenticated(api, { action }, { thunk }) {
}

export function* watchEnsureAuthenticated(api, { payload, meta }) {
  yield call(ensureAuthenticated, api, payload, meta);
}

export default function* authenticatedSagas({ api }) {
  yield takeEvery(actions.ENSURE_AUTHENTICATED, watchEnsureAuthenticated, api);
}
