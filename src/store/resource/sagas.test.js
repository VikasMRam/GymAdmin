import { put, call, takeEvery } from 'redux-saga/effects';
import { stringify } from 'query-string';
import * as actions from './actions';
import saga, * as sagas from './sagas';

const uri = (resource, id, params) => {
  if (typeof id === 'object') {
    params = id;
    id = undefined;
  }
  return `/${resource}${id ? `/${id}` : ''}${params ? `?${stringify(params)}` : ''}`;
};

const api = {
  post: () => {},
  get: () => {},
  put: () => {},
  uri,
  delete: () => {},
};

const thunk = '123';
const resource = 'resources';
const meta = { thunk, resource };

describe('sagas', () => {
  describe('createResource', () => {
    const payload = { data: 'foo', uri: uri('resources') };

    it('calls success', () => {
      const detail = 'detail';
      const generator = sagas.createResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.post], `/${resource}`, 'foo'));
      expect(generator.next(detail).value).toEqual(put(actions.resourceCreateSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
      const generator = sagas.createResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.post], `/${resource}`, 'foo'));
      expect(generator.throw('test').value).toEqual(put(actions.resourceCreateFailure(resource, 'test', payload, thunk)));
    });
  });

  describe('readResourceList', () => {
    const params = { _limit: 1 };
    const payload = { uri: uri('resources', params) };

    it('calls success', () => {
      const detail = [1, 2, 3];
      const generator = sagas.readResourceList(api, { ...payload, params }, meta);
      expect(generator.next().value).toEqual(call([api, api.get], `/${resource}?_limit=1`));
      expect(generator.next(detail).value).toEqual(put(actions.resourceListReadSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
      const generator = sagas.readResourceList(api, { ...payload, params }, meta);
      expect(generator.next().value).toEqual(call([api, api.get], `/${resource}?_limit=1`));
      expect(generator.throw('test').value).toEqual(put(actions.resourceListReadFailure(resource, 'test', payload, thunk)));
    });
  });

  describe('readResourceDetail', () => {
    const params = { params: 'params' };
    const payload = { needle: 1, uri: uri('resources', 1, params), };

    it('calls success', () => {
      const detail = 'foo';
      const generator = sagas.readResourceDetail(
        api,
        { ...payload, params },
        meta
      );
      expect(generator.next().value).toEqual(call([api, api.get], `/${resource}/1?params=params`));
      expect(generator.next(detail).value).toEqual(put(actions.resourceDetailReadSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
      const generator = sagas.readResourceDetail(
        api,
        { ...payload, params },
        meta
      );
      expect(generator.next().value).toEqual(call([api, api.get], `/${resource}/1?params=params`));
      expect(generator.throw('test').value).toEqual(put(actions.resourceDetailReadFailure(resource, 'test', payload, thunk)));
    });
  });

  describe('updateResource', () => {
    const payload = { needle: 1, data: 'foo', uri: uri('resources', 1) };

    it('calls success', () => {
      const detail = 'foo';
      const generator = sagas.updateResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.put], `/${resource}/1`, 'foo'));
      expect(generator.next(detail).value).toEqual(put(actions.resourceUpdateSuccess(resource, detail, payload, thunk)));
    });

    it('calls failure', () => {
      const generator = sagas.updateResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.put], `/${resource}/1`, 'foo'));
      expect(generator.throw('test').value).toEqual(put(actions.resourceUpdateFailure(resource, 'test', payload, thunk)));
    });
  });

  describe('deleteResource', () => {
    const payload = { needle: 1, uri: uri('resources', 1) };

    it('calls success', () => {
      const generator = sagas.deleteResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.delete], `/${resource}/1`));
      expect(generator.next().value).toEqual(put(actions.resourceDeleteSuccess(resource, payload, thunk)));
    });

    it('calls failure', () => {
      const generator = sagas.deleteResource(api, payload, meta);
      expect(generator.next().value).toEqual(call([api, api.delete], `/${resource}/1`));
      expect(generator.throw('test').value).toEqual(put(actions.resourceDeleteFailure(resource, 'test', payload, thunk)));
    });
  });

  test('watchResourceCreateRequest', () => {
    const payload = { data: 1 };
    const generator = sagas.watchResourceCreateRequest(api, { payload, meta });
    expect(generator.next().value).toEqual(call(sagas.createResource, api, payload, meta));
  });

  test('watchResourceListReadRequest', () => {
    const payload = { params: { _limit: 1 } };
    const generator = sagas.watchResourceListReadRequest(api, { payload, meta });
    expect(generator.next().value).toEqual(call(sagas.readResourceList, api, payload, meta));
  });

  test('watchResourceDetailReadRequest', () => {
    const payload = { needle: 1 };
    const generator = sagas.watchResourceDetailReadRequest(api, {
      payload,
      meta,
    });
    expect(generator.next().value).toEqual(call(sagas.readResourceDetail, api, payload, meta));
  });

  test('watchResourceUpdateRequest', () => {
    const payload = { needle: 1, data: { id: 1 } };
    const generator = sagas.watchResourceUpdateRequest(api, { payload, meta });
    expect(generator.next().value).toEqual(call(sagas.updateResource, api, payload, meta));
  });

  test('watchResourceDeleteRequest', () => {
    const payload = { needle: 1 };
    const generator = sagas.watchResourceDeleteRequest(api, { payload, meta });
    expect(generator.next({ payload, meta }).value).toEqual(call(sagas.deleteResource, api, payload, meta));
  });

  test('saga', () => {
    const generator = saga({ api });
    expect(generator.next().value).toEqual(takeEvery(
      actions.RESOURCE_CREATE_REQUEST,
      sagas.watchResourceCreateRequest,
      api
    ));
    expect(generator.next().value).toEqual(takeEvery(
      actions.RESOURCE_LIST_READ_REQUEST,
      sagas.watchResourceListReadRequest,
      api
    ));
    expect(generator.next().value).toEqual(takeEvery(
      actions.RESOURCE_DETAIL_READ_REQUEST,
      sagas.watchResourceDetailReadRequest,
      api
    ));
    expect(generator.next().value).toEqual(takeEvery(
      actions.RESOURCE_UPDATE_REQUEST,
      sagas.watchResourceUpdateRequest,
      api
    ));
    expect(generator.next().value).toEqual(takeEvery(
      actions.RESOURCE_DELETE_REQUEST,
      sagas.watchResourceDeleteRequest,
      api
    ));
  });
});

