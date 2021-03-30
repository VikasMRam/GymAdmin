import isPropValid from '@emotion/is-prop-valid';
import memoize from '@emotion/memoize';
import Color from 'color';

export const createShouldForwardProp = (from) => {
  const props = from.propNames;
  const regex = new RegExp(`^(${props.join('|')})$`);
  return memoize(prop => isPropValid(prop) && !regex.test(prop));
};

export const get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};

export const createMediaQuery = (n, bound = 'min') => `@media screen and (${bound}-width: ${n})`;

export const makeMediaQueries = (breakpoints = {}) => Object.entries(breakpoints)
  .reduce((acc, [name, value], i) => {
    acc.queries.push(createMediaQuery(value));
    acc.upTo.push(createMediaQuery(`calc(${value} - 1px)`, 'max'));
    acc.indexes[name] = i + 1;
    return acc;
  }, {
    indexes: {},
    queries: [null],
    upTo: [null],
  });


/**
 * expandToResponsiveMatrix.
 *
 * Expand a single dimension array of theme keys to a responsive matrix of theme values.
 *
 * @param {(string[])} keys
 * @param {Object} scale Theme object to inspect for values
 * @param {function} get Theme getter
 * @return {(string[][])} A matrix of strings for the responsive styles
 */
export const expandToResponsiveMatrix = (keys, scale, kget = get) => {
  let ySize = 1;
  const cols = keys.map((k) => {
    const kvals = typeof k === 'function'
      ? k(scale)
      : kget(scale, k, k);
    if (Array.isArray(kvals)) {
      ySize = Math.max(ySize, kvals.length);
    }
    return kvals;
  });

  const matrix = [];
  for (let row = 0; row < ySize; row++) {
    matrix.push(cols.map((col) => {
      if (!Array.isArray(col)) return col;
      const pick = Math.min(row, col.length - 1);
      return col[pick];
    }));
  }
  return matrix;
};

const interpolate = (strings, values) => {
  const result = [strings[0]];
  values.forEach((value, i) => {
    result.push(value, strings[i + 1]);
  });
  return result.join('');
};

export const template = (strings, ...keys) => (props) => {
  // here scale is ignored and theme is passed instead
  const matrix = expandToResponsiveMatrix(keys, props);
  const result = matrix.map(row => interpolate(strings, row));
  if (result.length === 1) {
    return result[0];
  }
  return result;
};

/**
 * getCardinalValue.
 *
 * get theme aware cardinal values, returns responsive styles for responsive theme values
 *
 * @param {(string|number)} n Style string
 * @param {Object} scale Theme object to inspect for values
 * @param {Object} _props Component props ... ignored param
 * @param {function} getValue Theme getter
 * @return {(string|string[])} A single string with the cardinal styles or an array of strings for the responsive styles
 *
 * @example
 *
 *    const n = 's m';
 *    const scale = { s: '1', m: '2' };
 *    getCardinalValue(n, scale, {});
 *    // => '1 2';
 *
 *    const n = 's m';
 *    const scale = { s: '1', m: ['a', 'b'] };
 *    getCardinalValue(n, scale, {});
 *    // => ['1 a', '1 b'];
 *
 *    const n = ['s', 'm'];
 *    const scale = { s: '1', m: ['a', 'b'] };
 *    getCardinalValue(n, scale, {});
 *    // => ['1 a', '1 b'];
 */
export const getCardinalValue = (n, scale, _props, getValue = get) => {
  const keys = (typeof n === 'string')
    ? n.split(/\s+/)
    : [n];
  const result = expandToResponsiveMatrix(keys, scale, getValue)
    .map((row) => {
      if (row.length === 1) return row[0];
      return row.join(' ');
    });
  if (result.length === 1) {
    return result[0];
  }
  return result;
};

const white = Color('white');
const black = Color('black');

const gradients = {
  'darker-40': { percentage: 0.40, tint: black },
  'darker-20': { percentage: 0.20, tint: black },
  base: { percentage: 0.00, tint: white },
  'lighter-20': { percentage: 0.20, tint: white },
  'lighter-40': { percentage: 0.40, tint: white },
  'lighter-60': { percentage: 0.60, tint: white },
  'lighter-80': { percentage: 0.80, tint: white },
  'lighter-90': { percentage: 0.90, tint: white },
  'lighter-95': { percentage: 0.95, tint: white },
};

export function makeColor(base) {
  const color = Color(base);
  return Object.keys(gradients).reduce((res, variant) => {
    const { percentage, tint } = gradients[variant];
    // eslint-disable-next-line no-multi-assign
    res[variant] = color.mix(tint, percentage).hex();
    return res;
  }, {});
}

export const fonts = {
  heading: 'Tiempos Headline, Georgia, serif',
  primary: 'Azo Sans, Roboto, sans-serif',
};

const fontText = (size, weight, font) => `${weight} ${size} ${font}`;
export const makeFont = (sizes, weight = 400, font = fonts.primary) => {
  if (Array.isArray(sizes)) {
    return sizes.map(size => size && fontText(size, weight, font));
  }
  return fontText(sizes, weight, font);
};

const toFixed = n => (typeof n === 'number' && n.toFixed(2)) || `(${n})`;
export const makeCols = (cols, gutter = '0', unit = '%') => `calc(((100${unit} + ${gutter}) * ${toFixed(cols)}) - ${gutter})`;

