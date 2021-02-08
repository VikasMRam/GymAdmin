import Color from 'color';

const white = Color('white');
const black = Color('black');

const gradients = [
  { percentage: 0.15, tint: black, variant: 'dark' },
  { percentage: 0.67, tint: white, variant: 'filler' },
  { percentage: 0.85, tint: white, variant: 'stroke' },
  { percentage: 0.92, tint: white, variant: 'background' },

  { percentage: 0.30, tint: black, variant: 'darker-30' },
  { percentage: 0.15, tint: black, variant: 'darker-15' },
  { percentage: 0.30, tint: white, variant: 'lighter-30' },

  // new colors

  { percentage: 0.40, tint: black, variant: 'darker-40' },
  { percentage: 0.20, tint: black, variant: 'darker-20' },
  { percentage: 0.00, tint: white, variant: 'base' },
  { percentage: 0.20, tint: white, variant: 'lighter-20' },
  { percentage: 0.40, tint: white, variant: 'lighter-40' },
  { percentage: 0.60, tint: white, variant: 'lighter-60' },
  { percentage: 0.80, tint: white, variant: 'lighter-80' },
  { percentage: 0.90, tint: white, variant: 'lighter-90' },
  { percentage: 0.95, tint: white, variant: 'lighter-95' },
];

const clear = color => color || '';
const variants = gradients.map(({ variant }) => variant);

// eslint-disable-next-line no-return-assign
export const colorIndex = variants.reduce((c, name, i) => ((c[name] = i, c)), {});

export function makeColor(base) {
  const color = Color(base);
  return gradients.reduce((res, { percentage, tint, variant }, i) => {
    // eslint-disable-next-line no-multi-assign
    res[i] = res[variant] = color.mix(tint, percentage).hex();
    return res;
  }, { length: gradients.length });
}

export function makeColorTable(palette) {
  return Object.entries(palette)
    .reduce((cumul, [name, colors]) => {
      // eslint-disable-next-line no-return-assign
      cumul[name] = variants.slice(5).reduce((c, variant) => {
        c[variant] = clear(colors[variant]);
        return c;
      }, {});
      return cumul;
    }, {});
}
