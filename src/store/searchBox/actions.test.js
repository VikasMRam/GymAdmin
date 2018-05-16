import * as actions from './actions';

test('changeAddress', () => {
  const value = 'abc';
  expect(actions.changeAddress(value)).toEqual(expect.objectContaining({
    type: actions.SEARCH_BOX_CHANGE_ADDRESS,
    payload: value,
  }));
});
