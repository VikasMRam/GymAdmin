import { key } from 'styled-theme';

export function size(...args) {
  return key(['sizes', ...args].join('.'));
}
