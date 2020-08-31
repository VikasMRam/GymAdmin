import React from 'react';
import { shape, string, bool, func } from 'prop-types';

import getFieldProps from './getFieldProps';

import Field from 'sly/common/components/molecules/Field';

const ReduxField = ({
  meta, input, warning, message, ...props
}) => {
  const fieldProps = {
    ...props,
    ...input,
    invalid: meta.touched && !!meta.error,
    message: message || meta.error || meta.warning,
    warning: !!meta.warning || warning,
    ...getFieldProps(input, meta, props),
  };

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

ReduxField.defaultProps = {
  meta: {},
};

export default ReduxField;
