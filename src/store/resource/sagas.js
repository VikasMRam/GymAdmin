// https://github.com/diegohaz/arc/wiki/Sagas
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* createResource(api, { data }, { resource, thunk }) {
  const { uri, path, queryString } = api.uri(resource);
  try {
    // https://github.com/diegohaz/arc/wiki/API-service
    const detail = yield call([api, api.post], uri, data);
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    yield put(actions.resourceCreateSuccess(resource, detail, { uri, path, queryString, data }, thunk));
  } catch (e) {
    yield put(actions.resourceCreateFailure(resource, e, { uri, path, queryString, data }, thunk));
  }
}

export function* readResourceList(api, { params }, { resource, thunk }) {
  const { uri, path, queryString } = api.uri(resource, params);
  try {
    const list = yield call([api, api.get], uri);
    yield put(actions.resourceListReadSuccess(resource, list, { uri, path, queryString }, thunk));
  } catch (e) {
    yield put(actions.resourceListReadFailure(resource, e, { uri, path, queryString }, thunk));
  }
}

export function* readResourceDetail(
  api,
  { needle, params },
  { resource, thunk }
) {
  const { uri, path, queryString } = api.uri(resource, needle, params);
  try {
    const detail = yield call([api, api.get], uri);
    yield put(actions.resourceDetailReadSuccess(resource, detail, { needle, uri, path, queryString }, thunk));
  } catch (e) {
    yield put(actions.resourceDetailReadFailure(resource, e, { needle, path, queryString, uri }, thunk));
  }
}

export function* updateResource(api, { needle, data }, { resource, thunk }) {
  const { uri, path, queryString } = api.uri(resource, needle);
  try {
    const detail = yield call([api, api.put], uri, data);
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
