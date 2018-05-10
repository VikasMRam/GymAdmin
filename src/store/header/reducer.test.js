import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const altState = {
  dropdownOpen: true,
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles HEADER_DROPDOWN_TOGGLE', () => {
  const action = {
    type: actions.HEADER_DROPDOWN_TOGGLE,
  };
  expect(reducer(initialState, action)).toEqual({ ...altState });
  expect(reducer(altState, action)).toEqual({ ...initialState });
});
