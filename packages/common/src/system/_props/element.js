/* eslint-disable no-restricted-globals */
import { system, get } from 'sly/common/system';

const isNumber = n => typeof n === 'number' && !isNaN(n);
const getWidth = (n, scale) =>
  get(scale, n, !isNumber(n) || n > 1 ? n : `${n * 100} %`);

const config = {
  width: {
    property: 'width',
    scale: 'element',
    transform: getWidth,
  },
  minWidth: {
    property: 'minWidth',
    scale: 'element',
  },
  maxWidth: {
    property: 'maxWidth',
    scale: 'element',
  },
  height: {
    property: 'height',
    scale: 'element',
  },
  minHeight: {
    property: 'minHeight',
    scale: 'element',
  },
  maxHeight: {
    property: 'maxHeight',
    scale: 'element',
  },

  size: {
    properties: ['width', 'height'],
    scale: 'element',
  },

  iconSize: true,
};

const element = system(config);

export default element;
