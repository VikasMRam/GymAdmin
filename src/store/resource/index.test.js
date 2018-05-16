// https://github.com/diegohaz/arc/wiki/Testing-redux-modules
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#resource
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import delay from 'delay';
import reducer from './reducer';
import sagas from './sagas';
import {
  resourceCreateRequest,
  resourceListReadRequest,
  resourceDetailReadRequest,
  resourceUpdateRequest,
  resourceDeleteRequest,
} from './actions';
import { getList, getDetail } from './selectors';

const sagaMiddleware = createSagaMiddleware();

const api = {
  post: (path, data) => Promise.resolve(data),
  get: () => Promise.resolve([1, 2, 3]),
  put: (path, data) => Promise.resolve(data),
  uri: () => 'uri',
  delete: () => Promise.resolve(),
};

const getStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(sagas, { api });
  return store;
};

const detail = (id=null) => ({ id , ids: id ? [id] : [], meta: {} });
const list = (ids=[]) => ({ ids, meta: {} });

describe('resource integration tests', () => {
  /* TODO #DISABLEDTEST
  test('resourceCreateRequest', async () => {
    const { getState, dispatch } = getStore();

    expect(getList(getState(), 'resources')).toEqual(list());

    dispatch(resourceCreateRequest('resources', { title: 'foo' }));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([{ title: 'foo' }]);

    dispatch(resourceCreateRequest('resources', { title: 'bar' }));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([
      { title: 'bar' },
      { title: 'foo' },
    ]);
  });

  test('resourceListReadRequest', async () => {
    const { getState, dispatch } = getStore();

    expect(getList(getState(), 'resources')).toEqual(list());

    dispatch(resourceListReadRequest('resources'));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([1, 2, 3]);

    dispatch(resourceListReadRequest('resources'));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([1, 2, 3]);
  });
  */
  // it('resourceDetailReadRequest', async () => {
  //   const { getState, dispatch } = getStore();

  //   expect(getDetail(getState(), 'resources')).toEqual(detail());

  //   dispatch(resourceDetailReadRequest('resources', '1'));
  //   await delay();
  //   expect(getDetail(getState(), 'resources')).toEqual(detail());

  //   dispatch(resourceDetailReadRequest('resources'));
  //   await delay();
  //   expect(getDetail(getState(), 'resources')).toEqual(detail());
  // });

  test('resourceUpdateRequest', async () => {
    const { getState, dispatch } = getStore({ resources: { list: [1, 2, 3] } });

    expect(getList(getState(), 'resources')).toEqual([1, 2, 3]);

    dispatch(resourceUpdateRequest('resources', 1, 4));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([4, 2, 3]);

    dispatch(resourceUpdateRequest('resources', 4, { title: 'foo' }));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([{ title: 'foo' }, 2, 3]);

    dispatch(resourceUpdateRequest('resources', { title: 'foo' }, { foo: 'bar' }));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([
      { title: 'foo', foo: 'bar' },
      2,
      3,
    ]);
  });

  it('resourceDeleteRequest', async () => {
    const { getState, dispatch } = getStore({
      resources: { list: [1, 2, { foo: 'bar' }] },
    });

    expect(getList(getState(), 'resources')).toEqual([1, 2, { foo: 'bar' }]);

    dispatch(resourceDeleteRequest('resources', 1));
    await delay();
    expect(getList(getState(), 'resources')).toEqual([2, { foo: 'bar' }]);
  });
});
