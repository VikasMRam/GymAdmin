import { oneOf } from 'prop-types';

import { getKey } from 'sly/common/components/themes';

const valueKeys = [
  'darker-30',
  'darker-15',
  'base',
  'lighter-30',
  'lighter-60',
  'lighter-90',
  'lighter-95',
];

const paletteData = getKey('palette');
const keys = Object.keys(paletteData);
export const palette = oneOf(keys.reduce((acc, key) => {
  acc.push(...valueKeys.map(valueKey => `${key}.${valueKey}`));
  return acc;
}, [...keys, 'transparent', 'currentColor']));
