import * as actions from './actions';

test('COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL', () => {
  expect(actions.toggleModalFilterPanel()).toEqual(expect.objectContaining({
    type: actions.COMMUNITY_SEARCH_TOGGLE_MODAL_FILTER_PANEL,
  }));
});
