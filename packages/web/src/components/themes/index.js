import { css } from 'styled-components';
import { key, palette as styledPalette } from 'styled-theme';
import { prop } from 'styled-tools';

import theme, { colorIndex } from './default';

import { publicPath } from 'sly/web/config';

export { key, font } from 'styled-theme';

export function size(...args) {
  return key(['sizes', ...args].join('.'));
}

export const columnWidth = (parts, gutter) => css`
  // WARNING: no semicolon here, keep it that way
  calc((100% + ${gutter}) / ${parts} - ${gutter})
`;

export const gridColumns = (parts, gutter) => css`
  display: grid;
  grid-gap: ${gutter};
  grid-template-columns: repeat(auto-fit, ${columnWidth(parts, gutter)});
`;

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

export function remToPx(rem) {
  return rem.replace('rem', '') * 16;
}
