import { getCardinalValue, template } from './util';

describe('getCardinalValue', () => {
  it('should pick values from theme with 1 dimension', () => {
    const scale = {
      a: 'x',
      b: 'y',
    };
    expect(getCardinalValue('z a b', scale)).toBe('z x y');
  });

  it('should pick values from theme with 2 dimensions', () => {
    const scale = {
      a: 'x',
      b: ['bx', 'by'],
      c: ['cx', 'cy', 'cz'],
    };
    expect(getCardinalValue('z a b c', scale)).toEqual([
      'z x bx cx',
      'z x by cy',
      'z x by cz',
    ]);
  });

  it('should not try to concatenate a 1x1 matrix', () => {
    const scale = {
      a: {
        b: 'y',
        c: 'z',
      },
    };
    expect(getCardinalValue('a', scale)).toEqual(scale.a);
  });

  it('can interpolate templates', () => {
    const scale = {
      a: 'x',
      b: 'y',
    };
    const calc = template`calc(${p => p.a} + ${p => p.b})`;
    expect(calc(scale)).toEqual('calc(x + y)');
  });

  it('can interpolate reponsive templates', () => {
    const scale = {
      a: 'x',
      b: ['bx', 'by'],
    };
    const calc = template`calc(${p => p.a} + ${p => p.b})`;
    expect(calc(scale)).toEqual([
      'calc(x + bx)',
      'calc(x + by)',
    ]);
  });
});

