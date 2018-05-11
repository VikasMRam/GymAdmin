import * as selectors from './selectors';

test('initialState', () => {
  expect(selectors.initialState).toEqual({ dropdownOpen: false });
});

test('isDropdownOpen', () => {
  expect(selectors.isDropdownOpen(undefined)).toBe(false);
  expect(selectors.isDropdownOpen(selectors.initialState)).toBe(false);
  expect(selectors.isDropdownOpen({ dropdownOpen: false })).toBe(false);
  expect(selectors.isDropdownOpen({ dropdownOpen: true })).toBe(true);
});
