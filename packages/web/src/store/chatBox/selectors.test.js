import * as selectors from './selectors';

test('initialState', () => {
  expect(selectors.initialState).toEqual({ footerReached: false });
});

test('hasFooterReached', () => {
  expect(selectors.hasFooterReached(undefined)).toBe(false);
  expect(selectors.hasFooterReached(selectors.initialState)).toBe(false);
  expect(selectors.hasFooterReached({ footerReached: false })).toBe(false);
  expect(selectors.hasFooterReached({ footerReached: true })).toBe(true);
});
