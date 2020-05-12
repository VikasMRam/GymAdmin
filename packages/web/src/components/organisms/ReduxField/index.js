import React from 'react';
import { shape, string, bool, func } from 'prop-types';

import Field from 'sly/web/components/molecules/Field';

const getReactSelectValue = (value, { value: oldValue }) => {
  if (Array.isArray(value)) {
    return value.map(({ value }) => value);
  }
  if (value === null && Array.isArray(oldValue)) {
    return [];
  }
  return value?.value;
};

const ReduxField = ({
  meta, input, warning, message, ...props
}) => {
  const fieldProps = {
    ...props,
    ...input,
    invalid: meta.touched && !!meta.error,
    message: message || meta.error || meta.warning,
    warning: !!meta.warning || warning,
  };

  if (fieldProps.type === 'date') {
    const oldBlur = fieldProps.onBlur;
    // date ui won't fire blur event after date pick so touched will be false
    fieldProps.invalid = meta.dirty && !!meta.error;
    fieldProps.onBlur = () => oldBlur(null, true);
  }

  if (fieldProps.type === 'choice') {
    fieldProps.onChange = (value, ...props) => input.onChange(getReactSelectValue(value, input), ...props);
    fieldProps.onBlur = _ => _;
  }

  if (fieldProps.type === 'autocomplete') {
    fieldProps.onBlur = _ => _;
  }

  if (fieldProps.type === 'button') {
    fieldProps.onClick = () => input.onChange(fieldProps.inputValue);
  }

  return <Field {...fieldProps} />;
};

ReduxField.propTypes = {
  onChange: func,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
  input: shape({
    name: string.isRequired,
  }).isRequired,
  warning: bool,
  message: string,
};

export default ReduxField;
