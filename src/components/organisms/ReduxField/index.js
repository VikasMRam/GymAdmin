import React from 'react';
import { shape, string, bool } from 'prop-types';

import Field from 'sly/components/molecules/Field';

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
  return <Field {...fieldProps} />;
};

ReduxField.propTypes = {
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
