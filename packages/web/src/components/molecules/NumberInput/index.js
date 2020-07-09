import React from 'react';
import { func } from 'prop-types';

import Input from 'sly/web/components/atoms/Input';

const NumberInput = ({ onChange, onBlur, ...props }) => {
  const parseChange = event => onChange(parseFloat(event.target.value));
  const parseBlur = event => onBlur(parseFloat(event.target.value));

  return (
    <Input
      {...props}
      onChange={parseChange}
      onBlur={parseBlur}
    />
  );
};

NumberInput.propTypes = {
  onChange: func,
  onBlur: func,
};

export default NumberInput;
