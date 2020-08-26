import { getKey } from 'sly/common/components/themes';

const getAutoValuesArray = (props, prefix) => {
  const ary = props[prefix];
  return ary && !Array.isArray(ary)
    ? ary.split(/\s/)
    : ary;
};

const getSignedValue = (value) => {
  if (value && value[0] === '-') {
    return ['-', value.substr(1)];
  }
  return ['', value];
};

const identity = x => x;
export const getCardinalValues = (props, prefix, themeGroup = prefix, decorator = identity) => {
  const themeValues = getKey(`sizes.${themeGroup}`);

  const ary = getAutoValuesArray(props, prefix);
  const decorate = (signedValue) => {
    const [sign, value] = getSignedValue(signedValue);
    const decoratedValue = decorator(themeValues[value]
      ? themeValues[value]
      : value);
    return `${sign}${decoratedValue}`;
  };

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
