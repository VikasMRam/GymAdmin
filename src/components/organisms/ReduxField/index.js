import React from 'react';
import PropTypes from 'prop-types';

import Field from 'sly/components/molecules/Field';

import * as molecules from 'sly/components/molecules';
console.log('molecules', molecules);

const ReduxField = ({ meta, input, ...props }) => {
  const fieldProps = {
    ...props,
    ...input,
    invalid: meta.touched && !!meta.error,
    error: meta.error,
  };
  return <Field {...fieldProps} />;
};

ReduxField.propTypes = {
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReduxField;
