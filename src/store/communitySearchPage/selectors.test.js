import * as selectors from './selectors';

test('initialState', () => {
  expect(selectors.initialState).toEqual({ modalFilterPanelVisible: false });
});

test('isModalFilterPanelVisible', () => {
  expect(selectors.isModalFilterPanelVisible(undefined)).toBe(false);
  expect(selectors.isModalFilterPanelVisible(selectors.initialState)).toBe(false);
  expect(selectors.isModalFilterPanelVisible({ modalFilterPanelVisible: false })).toBe(false);
  expect(selectors.isModalFilterPanelVisible({ modalFilterPanelVisible: true })).toBe(true);
});
