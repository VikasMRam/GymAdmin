import * as selectors from './selectors';

test('initialState', () => {
  expect(selectors.initialState).toEqual({ address: '', location: null });
});

test('address', () => {
  expect(selectors.searchBoxAddress(undefined)).toBe('');
  expect(selectors.searchBoxAddress(selectors.initialState)).toBe('');
  expect(selectors.searchBoxAddress({ address: '' })).toBe('');
  expect(selectors.searchBoxAddress({ address: 'abc' })).toBe('abc');
});

test('location', () => {
  expect(selectors.searchBoxLocation(undefined)).toBe(null);
  expect(selectors.searchBoxLocation(selectors.initialState)).toBe(null);
  expect(selectors.searchBoxLocation({ location: null })).toBe(null);
  expect(selectors.searchBoxLocation({ location: 'San Francisco' })).toBe('San Francisco');
});
