import { initialState } from './selectors';
import * as actions from './actions';
import reducer from './reducer';

const nextState = {
  modalFilterPanelVisible: true,
};

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('handles COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL', () => {
  const action = {
    type: actions.COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL,
  };
  expect(reducer(initialState, action)).toEqual({ ...nextState });
});
