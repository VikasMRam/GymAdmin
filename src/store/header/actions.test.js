import * as actions from './actions';

test('toggle', () => {
  expect(actions.toggle()).toEqual(expect.objectContaining({
    type: actions.HEADER_DROPDOWN_TOGGLE,
  }));
});
