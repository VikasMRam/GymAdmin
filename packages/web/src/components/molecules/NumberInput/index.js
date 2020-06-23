import React from 'react';
import { func } from 'prop-types';

import Input from 'sly/web/components/atoms/Input';

const NumberInput = ({ onChange, ...props }) => {
  const parseChange = (event) => {
    return onChange(parseFloat(event.target.value));
  };

  return (
    <Input {...props} onChange={parseChange} />
  );
};

NumberInput.propTypes = {
  onChange: func,
};

export default NumberInput;
