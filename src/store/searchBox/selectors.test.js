import * as selectors from './selectors';

test('initialState', () => {
  expect(selectors.initialState).toEqual({ address: '' });
});

test('address', () => {
  expect(selectors.searchBoxAddress(undefined)).toBe('');
  expect(selectors.searchBoxAddress(selectors.initialState)).toBe('');
  expect(selectors.searchBoxAddress({ address: '' })).toBe('');
  expect(selectors.searchBoxAddress({ address: 'abc' })).toBe('abc');
});
