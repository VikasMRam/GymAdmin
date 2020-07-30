import defaultTheme from './default';

import * as themeFunctions from '.';

describe('themes', () => {
  describe('getKey', () => {
    it('returns correct result when only one parameter is passed', () => {
      expect(themeFunctions.getKey('palette.slate.filler')).toBe(defaultTheme.palette.slate.filler);
    });

    it('returns correct result when multiple parameter is passed', () => {
      expect(themeFunctions.getKey('palette', 'slate', 'filler')).toBe(defaultTheme.palette.slate.filler);
    });
  });
});
