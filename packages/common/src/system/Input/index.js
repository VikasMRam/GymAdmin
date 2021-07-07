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
  ':focus, :active': {
    outline: 'none',
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
  background: props.error && '#FAE0E0',
  '&:hover': {
    borderColor: props.error ? '#DC3133' : 'slate.lighter-60',
  },
  '&:focus, &:active': {
    borderColor: props.error ? '#DC3133' : 'viridian.base',
  },
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
