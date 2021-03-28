import React, { forwardRef, useCallback } from 'react';
import { bool, func, string } from 'prop-types';

import Flex from 'sly/common/system/Flex';
import CheckBox from 'sly/common/icons/Checkbox';

const buttonBaseStyles = {
  border: 'box',
  height: 'element-l',
  font: 'body-m',
  padding: 'm',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  ':focus': {
    outline: 'none',
  },
};

const getColors = (disabled, value, palette, [defaultBackground, activeBackground]) => {
  if (disabled) {
    return {
      color: 'slate.base',
      background: 'slate.lighter-90',
      svg: {
        color: 'slate.lighter-40',
      },
    };
  }

  const baseColor = `${palette}.base`;
  console.log('baseColor', value, baseColor);
  return {
    color: value ? baseColor : 'slate.base',
    background: value ? activeBackground : defaultBackground,
    borderColor: value ? baseColor : 'slate.lighter-90',
    ':hover': {
      color: `${palette}.base`,
      borderColor: 'currentColor',
    },
    ':active': {
      color: `${palette}.base`,
      background: activeBackground,
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

const CheckboxButton = forwardRef(({ children, ...props }, ref) => {
  const onChange = useCallback(
    () => props.onChange(!props.value),
    [props.onChange, props.value],
  );
  // const Icon = props.value
  //   ? CheckboxFill
  //   : CheckboxEmpty;

  const baseColor = `${props.palette}.base`;
  const lighterColor = `${props.palette}.lighter-90`;

  return (
    <Flex
      ref={ref}
      as="button"
      border="box"
      padding="m"
      height="element-l"
      variant="neutral"
      onClick={onChange}
      sx={getStyles(props)}
      {...props}
    >
      <CheckBox active={props.value} color={baseColor} hoverColor={lighterColor} mr="s" />
      <span>
        {children}
      </span>
    </Flex>
  );
});

CheckboxButton.propTypes = {
  palette: string,
  value: bool,
  disabled: bool,
  onChange: func,
};

CheckboxButton.defaultProps = {
  palette: 'viridian',
};

export default CheckboxButton;
