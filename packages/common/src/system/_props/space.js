import { system, get, getCardinalValue, compose } from 'sly/common/system';

// eslint-disable-next-line no-restricted-globals
const isNumber = n => typeof n === 'number' && !isNaN(n);

const getMarginValue = (scale, n, def) => {
  if (!isNumber(n)) {
    if (typeof n === 'string') {
      const [, neg, k] = n.match(/(-)?(.*)/);
      const value = get(scale, k, k);
      return Array.isArray(value)
        ? value.map(value => neg ? `-${value}` : value)
        : (neg ? `-${value}` : value);
    } else {
      return def;
    }
  }

  const isNegative = n < 0;
  const absolute = Math.abs(n);
  const value = get(scale, absolute, absolute);
  return value * (isNegative ? -1 : 1);
}

export const getMargin = (n, scale, _props) => {
  if (typeof n === 'string' && n.indexOf(' ') !== -1) {
    return getCardinalValue(n, scale, _props, getMarginValue);
  }
  return getMarginValue(scale, n, n);
};

const configs = {};
configs.margin = {
  margin: {
    property: 'margin',
    scale: 'space',
    transform: getMargin,
    alias: 'm',
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
    transform: getMargin,
    alias: 'mt',
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
    transform: getMargin,
    alias: 'mr',
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
    transform: getMargin,
    alias: ['mb', 'pad'],
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
    transform: getMargin,
    alias: 'ml',
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
    transform: getMargin,
    alias: 'mx',
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
    transform: getMargin,
    alias: 'my',
  },
};

configs.padding = {
  padding: {
    property: 'padding',
    scale: 'space',
    transform: getCardinalValue,
    alias: 'p',
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
    transform: getCardinalValue,
    alias: 'pt',
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
    transform: getCardinalValue,
    alias: 'pr',
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
    transform: getCardinalValue,
    alias: 'pb',
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
    transform: getCardinalValue,
    alias: 'pl',
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
    transform: getCardinalValue,
    alias: 'px'
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
    transform: getCardinalValue,
    alias: 'py',
  },
};

export const margin = system(configs.margin);
export const padding = system(configs.padding);

const space = compose(margin, padding);
export default space;
