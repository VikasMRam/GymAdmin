import { palette as styledPalette, key as styledThemeKey } from 'styled-theme';
import { prop } from 'styled-tools';
import { oneOf } from 'prop-types';

import { colorIndex } from './color';
import theme from './default';

export { key, font } from 'styled-theme';

export function size(...args) {
  return styledThemeKey(['sizes', ...args].join('.'));
}

export function remToPx(rem) {
  return rem.includes('px') || rem.includes('%') ? rem : rem.replace('rem', '') * 16;
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

export function getKey(key) {
  // https://github.com/diegohaz/styled-tools/blob/master/src/prop.js#L11 -
  // this internally uses lodash get(https://lodash.com/docs#get) which is to getting
  // object keys by specified path
  return prop(key)(theme);
}

export function getThemePropType(path) {
  return oneOf(Object.keys(getKey(`sizes.${path}`)));
}
