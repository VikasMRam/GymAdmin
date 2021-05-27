import React from 'react';
import { func, bool } from 'prop-types';

import Input from 'sly/web/components/atoms/Input';
import { Block } from 'sly/common/system';

const NumberInput = ({ onChange, dollars, onBlur, ...props }) => {
  const parseChange = event => onChange(parseFloat(event.target.value));
  const parseBlur = event => onBlur(parseFloat(event.target.value));

  return (
    <>
      {dollars && <Block ml="xxxs" mt="xxxs" fontSize="body-s" position="absolute" >$</Block>}
      <Input
        {...props}
        onChange={parseChange}
        onBlur={parseBlur}
      />
    </>
  );
};

NumberInput.defaultProps = {
  dollars: false,
};

NumberInput.propTypes = {
  onChange: func,
  onBlur: func,
  dollars: bool,
};

export default NumberInput;
