import { palette as styledPalette, key as styledThemeKey } from 'styled-theme';
import { prop } from 'styled-tools';
import { oneOf } from 'prop-types';

import { colorIndex } from './color';
import theme from './default';

export { remToPx } from './helpers';

export { key, font } from 'styled-theme';

export function size(...args) {
  return styledThemeKey(['sizes', ...args].join('.'));
}

export function palette(...args) {
  if (args.length === 1 && typeof args[0] === 'string') {
    // eslint-disable-next-line no-param-reassign
    args = args[0].split('.');
  }
  let last = args.pop();
  if (typeof last === 'string') {
    last = colorIndex[last];
  }
  return styledPalette(...[...args, last]);
}

export function getKey(...args) {
  const key = args.length > 1 ? args.join('.') : args.pop();
  // https://github.com/diegohaz/styled-tools/blob/master/src/prop.js#L11 -
  // this internally uses lodash get(https://lodash.com/docs#get) which is to getting
  // object keys by specified path
  return prop(key)(theme);
}

export function getSize(...args) {
  return getKey(['sizes', ...args].join('.'));
}

export function getSizeKeys(...args) {
  return Object.keys(getSize(...args));
}

export function getThemePropType(...args) {
  return oneOf(getSizeKeys(...args));
}
