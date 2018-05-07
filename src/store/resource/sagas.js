// https://github.com/diegohaz/arc/wiki/Sagas
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* createResource(api, request, { thunk }) {
  try {
    // https://github.com/diegohaz/arc/wiki/API-service
    const detail = yield call([api, api.post], request);
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    yield put(actions.resourceCreateSuccess(resource, detail, request, thunk));
  } catch (e) {
    yield put(actions.resourceCreateFailure(resource, e, { uri, path, queryString, data }, thunk));
  }
}

export function* readResourceList(api, request, { thunk }) {
  try {
    const list = yield call([api, api.get], request);
    yield put(actions.resourceListReadSuccess(request, list, thunk));
  } catch (e) {
    yield put(actions.resourceListReadFailure(request, e, thunk));
  }
}

export function* readResourceDetail(api, request, { thunk }) {
  try {
    const detail = yield call([api, api.get], request);
    yield put(actions.resourceDetailReadSuccess(request, detail, thunk));
  } catch (e) {
    yield put(actions.resourceDetailReadFailure(request, e, thunk));
  }
}

export function* updateResource(api, request, { thunk }) {
  try {
    const detail = yield call([api, api.put], request, data);
    yield put(actions.resourceUpdateSuccess(resource, detail, { uri, path, queryString, needle, data }, thunk));
  } catch (e) {
    yield put(actions.resourceUpdateFailure(resource, e, { uri, path, queryString, needle, data }, thunk));
  }
}

export function* deleteResource(api, { needle }, { resource, thunk }) {
  const { uri, path, queryString } = api.uri(resource, needle);
  try {
    yield call([api, api.delete], uri);
    yield put(actions.resourceDeleteSuccess(resource, { uri, path, queryString, needle }, thunk));
  } catch (e) {
    yield put(actions.resourceDeleteFailure(resource, e, { uri, path, queryString, needle }, thunk));
  }
}

export function* watchResourceCreateRequest(api, { payload, meta }) {
  yield call(createResource, api, payload, meta);
}

export function* watchResourceListReadRequest(api, { payload, meta }) {
  yield call(readResourceList, api, payload, meta);
}

export function* watchResourceDetailReadRequest(api, { payload, meta }) {
  yield call(readResourceDetail, api, payload, meta);
}

export function* watchResourceUpdateRequest(api, { payload, meta }) {
  yield call(updateResource, api, payload, meta);
}

export function* watchResourceDeleteRequest(api, { payload, meta }) {
  yield call(deleteResource, api, payload, meta);
}

export default function* ({ api }) {
  yield takeEvery(
    actions.RESOURCE_CREATE_REQUEST,
    watchResourceCreateRequest,
    api
  );
  yield takeEvery(
    actions.RESOURCE_LIST_READ_REQUEST,
    watchResourceListReadRequest,
    api
  );
  yield takeEvery(
    actions.RESOURCE_DETAIL_READ_REQUEST,
    watchResourceDetailReadRequest,
    api
  );
  yield takeEvery(
    actions.RESOURCE_UPDATE_REQUEST,
    watchResourceUpdateRequest,
    api
  );
  yield takeEvery(
    actions.RESOURCE_DELETE_REQUEST,
    watchResourceDeleteRequest,
    api
  );
}
