import React from 'react';
import { string, shape, func } from 'prop-types';

import Field from 'sly/common/components/molecules/Field';


const FieldAdapter = ({ input, ...props }) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      input.onChange(e);
    },
  };
  return (
    <Field {...inputProps} {...props} />
  );
};

FieldAdapter.propTypes = {
  input: shape({
    name: string.isRequired,
  }).isRequired,
  onChange: func,
};

export default FieldAdapter;
