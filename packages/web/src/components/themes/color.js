import Color from 'color';

const white = Color('white');
const black = Color('black');

const gradients = [
  { percentage: 0.65, tint: black, variant: 'dark35' },
  { percentage: 0.85, tint: black, variant: 'dark' },
  { percentage: 1.00, tint: white, variant: 'base' },
  { percentage: 0.33, tint: white, variant: 'filler' },
  { percentage: 0.15, tint: white, variant: 'stroke' },
  { percentage: 0.08, tint: white, variant: 'background' },

  // new colors
  { percentage: 0.65, tint: black, variant: 'darker-30' },
  { percentage: 0.85, tint: black, variant: 'darker-15' },
  { percentage: 1.00, tint: white, variant: 'base' },
  { percentage: 0.70, tint: white, variant: 'lighter-30' },
  { percentage: 0.40, tint: white, variant: 'lighter-60' },
  { percentage: 0.10, tint: white, variant: 'lighter-90' },
  { percentage: 0.05, tint: white, variant: 'lighter-95' },
];
const clear = color => color || '';
const names = gradients.map(({ variant }) => variant);

export const colorIndex = names.reduce((c, name, i) => (c[name] = i, c), {});

export function makeColor(base, allowed = []) {
  const color = Color(base);
  return gradients.reduce((res, { percentage, tint, variant }, i) => {
    // eslint-disable-next-line no-multi-assign
    if (allowed.includes(variant)) {
      res[i] = res[variant] = tint.mix(color, percentage).hex();
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
