import { oneOf } from 'prop-types';

export const variation = oneOf([
  'base',
  'accent',
  'filler',
  'stroke',
  'background',
]);
