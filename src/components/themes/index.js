import Color from 'color';
import { key } from 'styled-theme';
import { prop } from 'styled-tools';

import { publicPath } from 'sly/config';
import theme from './default';

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

export function makeColor(base, ...variations) {
  const color = Color(base);
  const white = Color('white');
  return variations.map(v => white.mix(color, v).hex());
}
