import Color from 'color';

const white = Color('white');
const black = Color('black');

const gradients = [
  { percentage: 1.00, baseColor: white, variant: 'base' },
  { percentage: 0.67, baseColor: white, variant: 'accent' },
  { percentage: 0.33, baseColor: white, variant: 'filler' },
  { percentage: 0.15, baseColor: white, variant: 'stroke' },
  { percentage: 0.04, baseColor: white, variant: 'background' },
  { percentage: 0.85, baseColor: black, variant: 'dark' },
];
const clear = color => color || '';
const names = gradients.map(({ variant }) => variant);

export const colorIndex = names.reduce((c, name, i) => (c[name] = i, c), {});

export function makeColor(base, allowed = []) {
  const color = Color(base);
  return gradients.reduce((res, { percentage, baseColor, variant }, i) => {
    // eslint-disable-next-line no-multi-assign
    if (allowed.includes(variant)) {
      res[i] = res[variant] = baseColor.mix(color, percentage).hex();
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
