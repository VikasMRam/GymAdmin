import { getKey } from 'sly/common/components/themes';

const getAutoValuesArray = (props, prefix) => {
  const ary = props[prefix];
  return ary && !Array.isArray(ary)
    ? [ary]
    : ary;
};

const identity = x => x;
export const getCardinalValues = (props, prefix, themeGroup = prefix, decorator = identity) => {
  const themeValues = getKey(`sizes.${themeGroup}`);
  const ary = getAutoValuesArray(props, prefix);
  const decorate = value => themeValues[value]
    ? decorator(themeValues[value])
    : value;
  const acc = ary
    ? { [prefix]: ary.map(decorate).join(' ') }
    : {};
  return [
    'Top',
    'Right',
    'Bottom',
    'Left',
  ].reduce((acc, prop) => {
    const name = `${prefix}${prop}`;
    const value = props[name];
    if (typeof value !== 'undefined') {
      acc[name] = decorate(value);
    }
    return acc;
  }, acc);
};
