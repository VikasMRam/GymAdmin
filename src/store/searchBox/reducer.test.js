import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const value = 'abc';

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles SEARCH_BOX_CHANGE_ADDRESS', () => {
  const action = {
    type: actions.SEARCH_BOX_CHANGE_ADDRESS,
    payload: value,
  };
  expect(reducer(initialState, action).address).toEqual(value);
  expect(reducer(initialState, action).location).toEqual(null);
});

it('handles SEARCH_BOX_SET_LOCATION', () => {
  const action = {
    type: actions.SEARCH_BOX_SET_LOCATION,
    payload: value,
  };
  expect(reducer(initialState, action).location).toEqual(value);
});

it('handles SEARCH_BOX_CLEAR_LOCATION', () => {
  const action = {
    type: actions.SEARCH_BOX_CLEAR_LOCATION,
  };
  expect(reducer(initialState, action).location).toEqual(null);
  expect(reducer(initialState, action).address).toEqual('');
});

it('handles SEARCH_BOX_CLEAR_LOCATION with Value', () => {
  const action = {
    type: actions.SEARCH_BOX_CLEAR_LOCATION,
    payload: value,
  };
  expect(reducer(initialState, action).location).toEqual(null);
  expect(reducer(initialState, action).address).toEqual('');
});
