import { oneOf } from 'prop-types';

export const variation = oneOf([
  'dark',
  'filler',
  'stroke',
  'background',

  'darker-30',
  'darker-15',
  'base',
  'lighter-30',
  'lighter-60',
  'lighter-90',
  'lighter-95',
]);
