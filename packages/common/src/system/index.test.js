import { system } from './system';

const breakpoint = {
  mobile: '300px',
  tablet: '600px',
  desktop: '900px',
};

const x = {
  s: 'sx',
  m: 'mx',
  l: 'lx',
};

const y = {
  s: 'sy',
  m: ['smy', 'mmy'],
  l: 'ly',
};

const z = {
  s: 'sz',
  m: ['smz', 'mmz', 'lmz'],
  l: 'lz',
};

const gr = {
  s: 'sgr',
  m: {
    x: 'm',
    y: 'l',
  },
  l: 'lgr',
};

const css = {
  s: {
    x: 's',
  },
  m: {
    ':hover': {
      x: 'm',
    },
  },
};

describe('system', () => {
  it('throws when there is no theme', () => {
    const parse = system({});
    expect(() => parse({})).toThrow('There is no theme in props');
  });

  it('creates a parser with default function', () => {
    const parse = system({
      prop: true,
    });
    const sx = parse.config.prop;
    expect(typeof sx).toBe('function');
    expect(sx(null)).toEqual(null);
    expect(sx('first', { first: 'f' })).toEqual('f');
  });

  it('finds props', () => {
    const parse = system({
      prop: {
        scale: 'x',
        property: 'prop',
      },
    });

    const styles = parse({
      theme: { x },
      prop: 's',
    });

    expect(styles).toEqual({
      prop: 'sx',
    });
  });

  it('finds responsive prop', () => {
    const parse = system({
      prop: {
        scale: 'x',
        property: 'prop',
      },
    });

    const styles = parse({
      theme: { breakpoint, x },
      prop: ['l', 'm'],
    });

    expect(styles).toEqual({
      prop: 'lx',
      '@media screen and (min-width: 300px)': {
        prop: 'mx',
      },
    });
  });

  it('finds responsive theme prop', () => {
    const parse = system({
      prop: {
        scale: 'y',
        property: 'prop',
      },
    });

    const styles = parse({
      theme: { breakpoint, y },
      prop: 'm',
    });

    expect(styles).toEqual({
      prop: 'smy',
      '@media screen and (min-width: 300px)': {
        prop: 'mmy',
      },
    });
  });

  it('should start with the right responsive value not expecting lower breakpoints', () => {
    const parse = system({
      x: {
        scale: 'x',
        property: 'x',
      },
    });

    const styles = parse({
      theme: { breakpoint, x },
      x: 's',
      sx$mobile: {
        x: ['m', 'l'],
      },
    });

    expect(styles).toEqual({
      x: 'sx',
      '@media screen and (min-width: 300px)': {
        x: 'mx',
      },
      '@media screen and (min-width: 600px)': {
        x: 'lx',
      },
    });
  });

  it('passes down prop values not in theme', () => {
    const parse = system({
      x: {
        scale: 'x',
        property: 'x',
      },
    });

    const styles = parse({
      theme: { x },
      x: 'passthrough',
    });

    expect(styles).toEqual({
      x: 'passthrough',
    });
  });

  it('passes down props without config only when they are in a sx object', () => {
    const parse = system({});

    const styles = parse({
      theme: {},
      x: 'x',
      sx: {
        y: 'y',
      },
    });

    expect(styles).toEqual({
      y: 'y',
    });
  });

  it('finds responsive prop and theme', () => {
    const parse = system({
      z: {
        scale: 'z',
        property: 'z',
      },
    });

    const styles = parse({
      theme: { breakpoint, z },
      z: ['l', null, 'm'],
    });

    expect(styles).toEqual({
      z: 'lz',
      '@media screen and (min-width: 600px)': {
        z: 'lmz',
      },
    });
  });

  it('drills down when finds groups of props in the theme', () => {
    const parse = system({
      x: {
        scale: 'x',
        property: 'x',
      },
      y: {
        scale: 'y',
        property: 'y',
      },
      gr: {
        scale: 'gr',
        property: 'gr',
      },
    });

    const theme = { breakpoint, x, y, gr };

    expect(parse({
      theme,
      gr: 's',
    })).toEqual({
      gr: 'sgr',
    });

    expect(parse({
      theme,
      gr: 'm',
    })).toEqual({
      x: 'mx',
      y: 'ly',
    });

    expect(parse({
      theme,
      gr: ['s', 'm'],
    })).toEqual({
      gr: 'sgr',
      '@media screen and (min-width: 300px)': {
        x: 'mx',
        y: 'ly',
      },
    });
  });

  it('merges pseudo-selectors', () => {
    const parse = system({
      x: {
        scale: 'x',
        property: 'x',
      },
      css: {
        scale: 'css',
      },
    });

    const theme = { breakpoint, x, css };

    expect(parse({
      theme,
      css: 'm',
    })).toEqual({
      ':hover': {
        x: 'mx',
      },
    });

    expect(parse({
      theme,
      css: ['s', 'm'],
    })).toEqual({
      x: 'sx',
      '@media screen and (min-width: 300px)': {
        ':hover': {
          x: 'mx',
        },
      },
    });
  });

  it('finds responsive props', () => {
    const parse = system({
      x: {
        scale: 'x',
        property: 'x',
      },
      css: {
        scale: 'css',
      },
    });

    expect(parse({
      theme: { breakpoint, x, css },
      css: 's',
      '@tablet': {
        css: 'm',
      },
    })).toEqual({
      x: 'sx',
      '@media screen and (min-width: 600px)': {
        ':hover': {
          x: 'mx',
        },
      },
    });
  });

  it('picks the right value when there are more options in the prop than in the theme', () => {
    const parse = system({
      option: {
        scale: 'options',
        property: 'option',
      },
    });

    const theme = {
      breakpoint,
      options: {
        m: ['a', 'b'],
      },
    };

    expect(parse({
      theme,
      // eslint-disable-next-line no-sparse-arrays
      option: [, , 'm'],
    })).toEqual({
      '@media screen and (min-width: 600px)': {
        option: 'b',
      },
    });
  });

  it('call functions if passed as props', () => {
    const parse = system({
      prop: {
        scale: 'prop',
        property: 'prop',
      },
    });

    const theme = {
      breakpoint,
      prop: {
        x: ['a', 'b'],
      },
    };

    const props = {
      theme,
      prop: (p) => {
        expect(p).toBe(props);
        return 'this';
      },
    };
    expect(parse(props)).toEqual({
      prop: 'this',
    });
  });

  it('passes unknown configs down as selectors', () => {
    const parse = system({
      prop: {
        scale: 'prop',
        property: 'prop',
      },
    });

    const theme = {
      breakpoint,
      prop: {
        x: 'y',
      },
    };

    expect(parse({
      theme,
      sx: {
        pre: {
          prop: 'x',
        },
      },
    })).toEqual({
      pre: {
        prop: 'y',
      },
    });
  });

  it('understands variables in the form --[varName]--[config]', () => {
    const parse = system({
      prop: {
        scale: 'prop',
        property: 'prop',
      },
    });

    const theme = {
      breakpoint,
      prop: {
        x: 'y',
      },
    };

    expect(parse({
      theme,
      sx: {
        '--myVar-prop': 'x',
      },
    })).toEqual({
      '--myVar-prop': 'y',
    });
  });
});
