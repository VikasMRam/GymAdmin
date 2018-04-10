// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import configureStore from 'redux-mock-store';
import entitiesMiddleware from './middleware';
import { entitiesReceive } from './actions';

const mockStore = configureStore([entitiesMiddleware]);

describe('entities middleware', () => {
  it('dispatches the exactly same action', () => {
    const store = mockStore({});
    const action = { type: 'FOO', payload: 1 };
    expect(store.dispatch(action)).toEqual(action);
    expect(store.getActions()).toEqual([action]);
  });

  it('dispatches entities action along with the normalized action', () => {
    const store = mockStore({});
    const action = {
      type: 'FOO',
      payload: { data: { id: 2, type: 'entity' } },
      meta: { entities: 'entity', request: { uri: '/foo' } },
    };
    expect(store.dispatch(action)).toEqual({ ...action, payload: [{ id: 2, type: 'entity' }] });
    expect(store.getActions()).toEqual([
      entitiesReceive({ entity: { 2: { id: 2, attributes: {}, type: 'entity' } } }),
      { ...action, payload: [{ id: 2, type: 'entity' }] },
    ]);
  });

  it('dispatches entities action along with array', () => {
    const store = mockStore({});
    const action = {
      type: 'FOO',
      payload: { data: [{ id: 2, type: 'entity' }] },
      meta: { entities: 'entity', request: { uri: '/foo' } },
    };
    expect(store.dispatch(action)).toEqual({ ...action, payload: [{ id: 2, type: 'entity' }] });
    expect(store.getActions()).toEqual([
      entitiesReceive({ entity: { 2: { id: 2, attributes: {}, type: 'entity' } } }),
      { ...action, payload: [{ id: 2, type: 'entity' }] },
    ]);
  });
});
