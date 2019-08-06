import React from 'react';
import Select from 'react-select';
import { string, arrayOf, object } from 'prop-types';

import { getKey } from 'sly/components/themes';

const styles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? getKey('palette.primary.base') : getKey('palette.slate.stroke'),
    borderBottomLeftRadius: state.isFocused ? 0 : provided.borderRadiusBottomLeft,
    borderBottomRightRadius: state.isFocused ? 0 : provided.borderRadiusBottomRight,
    boxShadow: 'none',
    padding: getKey('sizes.spacing.small'),
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: provided => ({
    ...provided,
    padding: 0,
    fontSize: getKey('sizes.text.caption'),
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: getKey('sizes.text.caption'),
    paddingLeft: getKey('sizes.spacing.xxxLarge'),
    background: state.isSelected ? 'transparent' : provided.background,
    color: state.isSelected ? getKey('palette.primary.base') : provided.color,
    fontWeight: state.isSelected ? getKey('sizes.weight.medium') : provided.fontWeight,
  }),
  groupHeading: provided => ({
    ...provided,
    color: getKey('palette.grey.base'),
    fontWeight: getKey('sizes.weight.bold'),
  }),
  menu: provided => ({
    ...provided,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    top: `calc(${provided.top} - ${getKey('sizes.spacing.regular')})`,
  }),
};

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: getKey('palette.primary.base'),
  },
});

Select.displayName = 'Select';

const SelectComponent = ({ value, options, ...props }) => {
  const reducer = (accumulator, currentValue) => accumulator.push(currentValue.options ? currentValue.options : currentValue) && accumulator;
  const values = options.reduce(reducer, []);
  const flattenedValues = values.reduce((a, b) => a.concat(b), []);
  const match = flattenedValues.find(v => v.value === value);
  if (match) {
    value = match;
  }

  return <Select options={options} defaultValue={value} styles={styles} theme={theme} blurInputOnSelect {...props} />;
};

SelectComponent.propTypes = {
  value: string,
  options: arrayOf(object).isRequired,
};

export default SelectComponent;
