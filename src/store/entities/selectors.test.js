// https://github.com/diegohaz/arc/wiki/Selectors#unit-testing-selectors
// https://github.com/diegohaz/arc/wiki/Example-redux-modules#entities
import values from 'lodash/values'
import * as selectors from './selectors'

jest.mock('schemas')

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
}

test('initialState', () => {
  expect(selectors.initialState).toEqual({})
})

test('getEntity', () => {
  expect(selectors.getEntity(undefined, 'test')).toEqual({})
  expect(selectors.getEntity({}, 'test')).toEqual({})
  expect(selectors.getEntity(altState, 'test')).toEqual({})
  expect(selectors.getEntity(altState, 'entity')).toEqual(altState.entity)
})

// Redux object returns explicit null objects instead of undefined
// Check redux-object https://github.com/yury-dymov/redux-object/blob/master/test/redux-object.spec.js
test('getDetail', () => {
  expect(selectors.getDetail(undefined, 'test')).toBeNull()
  expect(selectors.getDetail(undefined, 'test', 1)).toBeNull()
  expect(selectors.getDetail({}, 'test')).toBeNull()
  expect(selectors.getDetail({}, 'test', 1)).toBeNull()
  expect(selectors.getDetail(altState, 'entity')).toEqual([{"description": "test", "id": 1, "title": "test"}, {"description": "test 2", "id": 2, "title": "test 2"}]) // TODO failure Warning
  expect(selectors.getDetail(altState, 'entity', 1)).toEqual(altState.entity[1].attributes) // TODO Failure need other deails
})

// Redux object returns empty list if no ids are specified
test('getList', () => {
  expect(selectors.getList(undefined, 'test')).toEqual([])
  expect(selectors.getList(undefined, 'test', [1])).toEqual([null])
  expect(selectors.getList({}, 'test')).toEqual([])
  expect(selectors.getList({}, 'test', [1])).toEqual([null])
  expect(selectors.getList(altState, 'entity')).toEqual([])
  expect(selectors.getList(altState, 'entity', [1])).toEqual([altState.entity[1].attributes]) //TODO Failure
  // expect(selectors.getList(altState, 'entity', [1])).toEqual([null]) //TODO Failure
})

/*
test('getDenormalizedDetail', () => {
  expect(selectors.getDenormalizedDetail(undefined, 'test')).toBeUndefined()
  expect(selectors.getDenormalizedDetail(undefined, 'test', 1)).toBeUndefined()
  expect(selectors.getDenormalizedDetail({}, 'test')).toBeUndefined()
  expect(selectors.getDenormalizedDetail({}, 'test', 1)).toBeUndefined()
  expect(selectors.getDenormalizedDetail(altState, 'entity')).toBeUndefined()
  expect(selectors.getDenormalizedDetail(altState, 'entity', 1)).toEqual(altState.entity[1])
})

test('getDenormalizedList', () => {
  expect(selectors.getDenormalizedList(undefined, 'test')).toEqual([])
  expect(selectors.getDenormalizedList(undefined, 'test', [1])).toEqual([undefined])
  expect(selectors.getDenormalizedList({}, 'test')).toEqual([])
  expect(selectors.getDenormalizedList({}, 'test', [1])).toEqual([undefined])
  expect(selectors.getDenormalizedList(altState, 'entity')).toEqual(values(altState.entity))
  expect(selectors.getDenormalizedList(altState, 'entity', [1])).toEqual([altState.entity[1]])
})
*/
