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

const white = Color('white');
const gradients = [
  [1.00, 'base'],
  [0.67, 'accent'],
  [0.33, 'filler'],
  [0.15, 'stroke'],
  [0.04, 'background'],
];

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

const clear = color => color || '';
export function makeColorTable(palette) {
  const names = gradients.map(([_, name]) => name);
  return Object.entries(palette)
    .reduce((cumul, [name, colors]) => {
        cumul[name] = names.reduce((c, name) => (c[name] = clear(colors[name]), c), {});
        return cumul;
    }, {});
}
