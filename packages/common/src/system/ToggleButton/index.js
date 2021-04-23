import React, { forwardRef, useCallback } from 'react';
import { bool, func, string } from 'prop-types';

import Block from 'sly/common/system/Block';

const buttonBaseStyles = {
  border: 'box',
  height: 'element-l',
  font: 'body-m',
  padding: 'm',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  cursor: 'pointer',
  textOverflow: 'ellipsis',
  ':focus': {
    outline: 'none',
  },
};

const getColors = (disabled, value, palette, [background, active]) => {
  if (disabled) {
    return {
      color: 'slate.base',
      background: 'slate.lighter-90',
    };
  }

  const baseColor = `${palette}.base`;
  return {
    color: value ? baseColor : 'slate.base',
    background: value ? active : background,
    borderColor: value ? baseColor : 'slate.lighter-90',
    ':hover': {
      color: `${palette}.base`,
      borderColor: 'currentColor',
    },
    ':active': {
      color: `${palette}.base`,
      background: active,
    },
  };
};

const getStyles = ({ palette, value, disabled }) => ({
  ...buttonBaseStyles,
  ...getColors(disabled, value, palette, [
    'white.base',
    `${palette}.lighter-90`,
  ]),
});

const ToggleButton = forwardRef((props, ref) => {
  const onChange = useCallback(
    () => props.onChange(!props.value),
    [props.onChange, props.value],
  );

  return (
    <Block
      ref={ref}
      as="button"
      border="box"
      padding="m"
      height="element-l"
      variant="neutral"
      onClick={onChange}
      sx={getStyles(props)}
      {...props}
    />
  );
});

ToggleButton.propTypes = {
  palette: string,
  value: bool,
  disabled: bool,
  onChange: func,
};

ToggleButton.defaultProps = {
  palette: 'viridian',
};

export default ToggleButton;
