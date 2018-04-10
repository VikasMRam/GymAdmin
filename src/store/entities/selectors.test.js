// https://github.com/diegohaz/arc/wiki/Selectors#unit-testing-selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import values from 'lodash/values';
import * as selectors from './selectors';

const altState = {
  entity: {
    1: {
      attributes: {
        id: 1,
        title: 'test',
        description: 'test',
      },
    },
    2: {
      attributes: {
        id: 2,
        title: 'test 2',
        description: 'test 2',
      },
    },
  },
};

describe('entities selectors', () => {
  test('initialState', () => {
    expect(selectors.initialState).toEqual({});
  });

  test('getDetail', () => {
    expect(selectors.getDetail(undefined, 'test')).toBeNull();
    expect(selectors.getDetail(undefined, 'test', 1)).toBeNull();
    expect(selectors.getDetail({}, 'test')).toBeNull();
    expect(selectors.getDetail({}, 'test', 1)).toBeNull();
    expect(selectors.getDetail(altState, 'entity', 1)).toEqual(altState.entity[1].attributes);
  });

  // Redux object returns empty list if no ids are specified
  test('getList', () => {
    expect(selectors.getList(undefined, 'test')).toEqual([]);
    expect(selectors.getList(undefined, 'test', [1])).toEqual([null]);
    expect(selectors.getList({}, 'test')).toEqual([]);
    expect(selectors.getList({}, 'test', [1])).toEqual([null]);
    expect(selectors.getList(altState, 'entity')).toEqual([]);
    expect(selectors.getList(altState, 'entity', [1])).toEqual([
      altState.entity[1].attributes,
    ]);
  });
});
