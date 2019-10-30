import React from 'react';
import { shape, string, bool, func } from 'prop-types';

import Field from 'sly/components/molecules/Field';

const getReactSelectValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(({ value }) => value);
  }
  return value.value;
};

const ReduxField = ({
  meta, input, warning, message, ...props
}) => {
  const fieldProps = {
    ...props,
    ...input,
    invalid: meta.touched && !!meta.error,
    message: meta.error || meta.warning || message,
    warning: !!meta.warning || warning,
  };

  if (fieldProps.type === 'date') {
    const oldBlur = fieldProps.onBlur;
    fieldProps.onBlur = () => oldBlur(null, true);
  }

  if (fieldProps.type === 'choice') {
    fieldProps.onChange = (value, ...props) => input.onChange(getReactSelectValue(value), ...props);
    fieldProps.onBlur = _ => _;
  }

  if (fieldProps.type === 'autocomplete') {
    fieldProps.onBlur = _ => _;
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
