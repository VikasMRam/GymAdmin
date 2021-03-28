import { system, get } from 'sly/common/system';

export const getColor = (n, scale) => {
  return get(scale,
    (typeof n === 'string' && n.charAt(0) !== '#' && !n.match(/\./))
      ? `${n}.base`
      : n, n);
};

const config = {
  color: {
    property: 'color',
    scale: 'color',
    transform: getColor,
  },
  fill: {
    property: 'fill',
    scale: 'color',
    transform: getColor,
  },
  background: {
    property: 'background',
    scale: 'color',
    transform: getColor,
  },

  borderColor: {
    property: 'borderColor',
    scale: 'color',
    transform: getColor,
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'color',
    transform: getColor,
  },
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'color',
    transform: getColor,
  },
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'color',
    transform: getColor,
  },
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'color',
    transform: getColor,
  },
};

const color = system(config);
export default color;
