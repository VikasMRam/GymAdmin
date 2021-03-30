import React, { forwardRef } from 'react';
import { bool, string } from 'prop-types';

import Block from 'sly/common/system/Block';

const defaultStyles = {
  font: 'body-m',

  padding: 's l',
  border: 'box',
  height: 'm',

  '::placeholder': {
    color: 'slate.lighter-40',
  },
  ':hover': {
    borderColor: 'slate.lighter-60',
  },
  ':focus, :active': {
    outline: 'none',
    borderColor: 'viridian.base',
  },
};

const getStyles = props => ({
  ...defaultStyles,
  backgroundColor: props.disabled
    ? 'slate.lighter-90'
    : null,
  color: props.disabled
    ? 'slate.lighter-40'
    : null,
});


const Input = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="input"
    _sx={getStyles(props)}
    {...props}
  />
));

Input.propTypes = {
  type: string,
  disabled: bool,
};

Input.defaultProps = {
  type: 'text',
};

Input.displayName = 'Input';

export default Input;
