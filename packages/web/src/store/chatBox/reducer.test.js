import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const altState = {
  footerReached: true,
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles CHAT_BOX_FOOTER_REACHED_TOGGLE', () => {
  const action = {
    type: actions.CHAT_BOX_FOOTER_REACHED_TOGGLE,
  };
  expect(reducer(initialState, action)).toEqual({ ...altState });
  expect(reducer(altState, action)).toEqual({ ...initialState });
});
