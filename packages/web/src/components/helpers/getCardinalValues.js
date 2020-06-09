import { getKey, size } from 'sly/web/components/themes';

const getAutoValuesArray = (props, prefix) => {
  const ary = props[prefix];
  return ary && !Array.isArray(ary)
    ? [ary]
    : ary;
};

export const getCardinalValues = (props, prefix, group) => {
  const themeValues = getKey(`sizes.${group}`);
  const ary = getAutoValuesArray(props, prefix);
  const acc = ary
    ? { [prefix]: ary.map(value => themeValues[value] || value).join(' ') }
    : {};
  return [
    'Top',
    'Right',
    'Bottom',
    'Left',
  ].reduce((acc, prop, i) => {
    const name = `${prefix}${prop}`;
    const value = props[name];
    if (value) {
      acc[name] = size(group, value);
    }
    return acc;
  }, acc);
};
