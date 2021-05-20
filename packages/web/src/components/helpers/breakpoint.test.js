import {
  Breakpoint,
  LANDSCAPE,
  PORTRAIT,
  MOBILE,
  TABLET,
  LAPTOP,
} from './breakpoint';

const breakpoints = {
  [MOBILE]           : 0,
  [TABLET]           : 728,
  [LAPTOP]           : 1080,
};

const order = [
  MOBILE,
  TABLET,
  LAPTOP,
];

const indexes = Object.fromEntries(Object.entries(order).map(([k, v]) => [v, k]));

describe('breakpoint', () => {
  it('should detect upTo and atLeast breakpoints', () => {
    Object.entries(breakpoints).forEach(([breakpoint, size], i) => {
      const currentBreakpoint = order[i];
      const current = new Breakpoint(size, size * 1.5);

      if (i) {
        const previousBreakpoint = order[i - 1];
        const previous = new Breakpoint(size - 1, size * 1.5);

        expect(previous.atLeast(currentBreakpoint)).toBe(false);
        expect(current.atLeast(previousBreakpoint)).toBe(true);

        expect(previous.upTo(currentBreakpoint)).toBe(true);
        expect(current.upTo(previousBreakpoint)).toBe(false);
      }

      expect(current.atLeast(currentBreakpoint)).toBe(true);
      expect(current.upTo(currentBreakpoint)).toBe(false);

      if (order[i + 1]) {
        const nextBreakpoint = order[i + 1];
        const next = new Breakpoint(breakpoints[nextBreakpoint], size);

        expect(current.atLeast(nextBreakpoint)).toBe(false);
        expect(next.atLeast(currentBreakpoint)).toBe(true);

        expect(current.upTo(nextBreakpoint)).toBe(true);
        expect(next.upTo(currentBreakpoint)).toBe(false);
      }
      //expect(current.atLeast(previousBreakpoint)).toBe(false);
    });
  });

  it('should detect is() with orientations', () => {
    let current;

    current = new Breakpoint(800, 600);

    expect(() => {
      current.is(LAPTOP, LANDSCAPE);
    }).toThrow('Laptop can only be PORTRAIT');

    expect(current.is(MOBILE)).toBe(false);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(true);
    expect(current.is(TABLET)).toBe(false);
    expect(current.is(TABLET, LANDSCAPE)).toBe(false);
    expect(current.is(LAPTOP)).toBe(false);

    current = new Breakpoint(600, 800);
    expect(current.is(MOBILE)).toBe(true);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(false);
    expect(current.is(TABLET)).toBe(false);
    expect(current.is(TABLET, LANDSCAPE)).toBe(false);
    expect(current.is(LAPTOP)).toBe(false);

    current = new Breakpoint(1200, 800);
    expect(current.is(MOBILE)).toBe(false);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(false);
    expect(current.is(TABLET)).toBe(false);

    // this both are true
    expect(current.is(TABLET, LANDSCAPE)).toBe(true);
    expect(current.is(LAPTOP)).toBe(true);


    current = new Breakpoint(800, 1200);
    expect(current.is(MOBILE)).toBe(false);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(false);
    expect(current.is(TABLET)).toBe(true);
    expect(current.is(TABLET, LANDSCAPE)).toBe(false);
    expect(current.is(LAPTOP)).toBe(false);

    current = new Breakpoint(1200, 1500);
    expect(current.is(MOBILE)).toBe(false);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(false);
    expect(current.is(TABLET)).toBe(false);
    expect(current.is(TABLET, LANDSCAPE)).toBe(false);
    expect(current.is(LAPTOP)).toBe(true);

    current = new Breakpoint(1500, 1200);
    expect(current.is(MOBILE)).toBe(false);
    expect(current.is(MOBILE, LANDSCAPE)).toBe(false);
    expect(current.is(TABLET)).toBe(false);
    expect(current.is(TABLET, LANDSCAPE)).toBe(false);
    expect(current.is(LAPTOP)).toBe(true);
  });
});

