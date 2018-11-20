import Color from 'color';

const white = Color('white');

const gradients = [
  [1.00, 'base'],
  [0.67, 'accent'],
  [0.33, 'filler'],
  [0.15, 'stroke'],
  [0.04, 'background'],
];
const clear = color => color || '';
const names = gradients.map(([_, name]) => name);

export const colorIndex = names.reduce((c, name, i) => (c[name] = i, c), {});

export function makeColor(base, allowed = []) {
  const color = Color(base);
  return gradients.reduce((res, [v, name], i) => {
    // eslint-disable-next-line no-multi-assign
    if (allowed.includes(name)) {
      res[i] = res[name] = white.mix(color, v).hex();
    }
    return res;
  }, { length: gradients.length });
}

export function makeColorTable(palette) {
  return Object.entries(palette)
    .reduce((cumul, [name, colors]) => {
      cumul[name] = names.reduce((c, name) => (c[name] = clear(colors[name]), c), {});
      return cumul;
    }, {});
}
