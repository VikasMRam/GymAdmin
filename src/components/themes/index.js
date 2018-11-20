import { key, palette as styledPalette } from 'styled-theme';
import { prop } from 'styled-tools';

import { publicPath } from 'sly/config';
import theme, { colorIndex } from './default';

export { key, font } from 'styled-theme';

export function size(...args) {
  return key(['sizes', ...args].join('.'));
}

export function assetPath(url) {
  return `${publicPath}/${url}`;
}

export function getKey(key) {
  // https://github.com/diegohaz/styled-tools/blob/master/src/prop.js#L11 -
  // this internally uses lodash get(https://lodash.com/docs#get) which is to getting
  // object keys by specified path
  return prop(key)(theme);
}

export function palette(...args) {
  let last = args.pop();
  if (typeof last === 'string') {
    last = colorIndex[last];
  }
  return styledPalette(...[...args, last]);
}
