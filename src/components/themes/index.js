import { key } from 'styled-theme';
import { publicPath } from 'sly/config';

export function size(...args) {
  return key(['sizes', ...args].join('.'));
}

export function assetPath(url) {
  return `${publicPath}/${url}`;
}
