import * as actions from './actions';

test('changeAddress', () => {
  const value = 'abc';
  expect(actions.changeAddress(value)).toEqual(expect.objectContaining({
    type: actions.SEARCH_BOX_CHANGE_ADDRESS,
    payload: value,
  }));
});

test('setLocation', () => {
  const value = 'San Francisco';
  expect(actions.setLocation(value)).toEqual(expect.objectContaining({
    type: actions.SEARCH_BOX_SET_LOCATION,
    payload: value,
  }));
});

test('clearLocation', () => {
  expect(actions.clearLocation()).toEqual(expect.objectContaining({
    type: actions.SEARCH_BOX_CLEAR_LOCATION,
  }));
});
