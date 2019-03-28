// https://github.com/diegohaz/arc/wiki/Sagas
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import { put, call, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

export function* createResource(api, { data }, { resource, thunk }) {
  const uri = api.uri(resource);
  try {
    // https://github.com/diegohaz/arc/wiki/API-service
    const detail = yield call([api, api.post], uri, data);
    // https://github.com/diegohaz/arc/wiki/Actions#async-actions
    yield put(actions.resourceCreateSuccess(resource, detail, { uri, data }, thunk));
  } catch (e) {
    yield put(actions.resourceCreateFailure(resource, e, { uri, data }, thunk));
  }
}

export function* readResourceList(api, { params }, { resource, thunk }) {
  const uri = api.uri(resource, params);
  try {
    const list = yield call([api, api.get], uri);
    yield put(actions.resourceListReadSuccess(resource, list, { uri }, thunk));
  } catch (e) {
    yield put(actions.resourceListReadFailure(resource, e, { uri }, thunk));
  }
}

export function* readResourceDetail(
  api,
  { needle, params },
  { resource, thunk }
) {
  const uri = api.uri(resource, needle, params);
  try {
    const detail = yield call([api, api.get], uri);
    yield put(actions.resourceDetailReadSuccess(resource, detail, { needle, uri }, thunk));
  } catch (e) {
    yield put(actions.resourceDetailReadFailure(resource, e, { needle, uri }, thunk));
  }
}

export function* updateResource(api, { needle, data }, { resource, thunk }) {
  const uri = api.uri(resource, needle);
  try {
    const detail = yield call([api, api.put], uri, data);
    yield put(actions.resourceUpdateSuccess(resource, detail, { uri, needle, data }, thunk));
  } catch (e) {
    yield put(actions.resourceUpdateFailure(resource, e, { uri, needle, data }, thunk));
  }
}

export function* patchResource(api, { needle, data }, { resource, thunk }) {
  const uri = api.uri(resource, needle);
  try {
    const detail = yield call([api, api.PATCH], uri, data);
    yield put(actions.resourceUpdateSuccess(resource, detail, { uri, needle, data }, thunk));
  } catch (e) {
    yield put(actions.resourceUpdateFailure(resource, e, { uri, needle, data }, thunk));
  }
}

export function* deleteResource(api, { needle }, { resource, thunk }) {
  const uri = api.uri(resource, needle);
  try {
    yield call([api, api.delete], uri);
    yield put(actions.resourceDeleteSuccess(resource, { uri, needle }, thunk));
  } catch (e) {
    yield put(actions.resourceDeleteFailure(resource, e, { uri, needle }, thunk));
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

export function* watchResourcePatchRequest(api, { payload, meta }) {
  yield call(patchResource, api, payload, meta);
}

export function* watchResourceDeleteRequest(api, { payload, meta }) {
  yield call(deleteResource, api, payload, meta);
}

export default function* resourceSagas({ api }) {
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
    actions.RESOURCE_PATCH_REQUEST,
    watchResourcePatchRequest,
    api
  );
  yield takeEvery(
    actions.RESOURCE_DELETE_REQUEST,
    watchResourceDeleteRequest,
    api
  );
}
