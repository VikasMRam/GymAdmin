import { twoSetsAreEqual } from './selectors';

describe('twoSetsAreEqual', () => {
  it('when none is array', () => {
    expect(twoSetsAreEqual('a', 'b')).toBe(false);
    expect(twoSetsAreEqual('a', 'a')).toBe(true);
  });

  it('when only one is array', () => {
    expect(twoSetsAreEqual(['a'], 'b')).toBe(false);
    expect(twoSetsAreEqual('a', ['b'])).toBe(false);
  });

  it('when both are arrays', () => {
    expect(twoSetsAreEqual(['a', 'b'], ['a', 'b'])).toBe(true);
    expect(twoSetsAreEqual(['a', 'b'], ['a', 'c'])).toBe(false);
  });
});
