import { getKey, size } from 'sly/web/components/themes';

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
  const acc = ary
    ? { [prefix]: ary.map(value => decorator(themeValues[value]) || value).join(' ') }
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
      acc[name] = decorator(themeValues[value]);
    }
    return acc;
  }, acc);
};
