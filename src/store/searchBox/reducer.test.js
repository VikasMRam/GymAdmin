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
  expect(reducer(initialState, action)).toEqual({ address: value });
});
