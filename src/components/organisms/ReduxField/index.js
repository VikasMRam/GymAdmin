import React from 'react';
import { shape, string, bool } from 'prop-types';

import Field from 'sly/components/molecules/Field';

const ReduxField = ({ meta, input, ...props }) => {
  const fieldProps = {
    ...props,
    ...input,
    invalid: meta.touched && !!meta.error,
    message: meta.error,
  };
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
};

export default ReduxField;
