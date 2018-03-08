// https://github.com/diegohaz/arc/wiki/Sagas
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

const trackUrl = '/personalization/useractions/track';
const requestUpdateUrl = '/personalization/useractions/ru';

export function* convertUser(api, { data }, { thunk }) {
  try {
    // https://github.com/diegohaz/arc/wiki/API-service
    const detail = yield call([api, api.post], `${trackUrl}`, data);
    console.log('---USER CONVERT MID PROCESS-Saw every thing here', detail);
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    yield put(actions.userConversionSuccess(detail, { data }, thunk));
  } catch (e) {
    console.log('Saw this message', e);
    yield put(actions.userConversionFailure(e, { data }, thunk));
  }
}
export function* watchConverUserRequest(api, { payload, meta }) {
  console.log(
    '---USER CONVERT WATCHER-Saw every thing here',
    payload,
    'Meta',
    meta,
  );
  yield call(convertUser, api, payload, meta);
}

export default function* ({ api }) {
  yield takeEvery(actions.USER_CONVERSION_REQUEST, watchConverUserRequest, api);
}
