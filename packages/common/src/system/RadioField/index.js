import React, { forwardRef } from 'react';
import { bool, string } from 'prop-types';

import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import RadioIcon from 'sly/common/icons/Radio';

const RadioField = forwardRef(({ name, value, label, checked, iconPalette, ...props }, ref) => {
  const id = `radio-${name}-${value}`;
  const baseColor = `${iconPalette}.base`;
  const lighterColor = `${iconPalette}.lighter-90`;
  return (
    <Block ref={ref} {...props}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        style={{ display: 'none' }}
      />
      <Flex
        as="label"
        htmlFor={id}
      >
        <RadioIcon
          color={baseColor}
          active={checked}
          hoverColor={lighterColor}
        />
        <Block as="span">{label}</Block>
      </Flex>
    </Block>
  );
});

RadioField.propTypes = {
  type: string,
  disabled: bool,
  name: string.isRequired,
  value: string.isRequired,
  checked: bool,
  iconPalette: string,
  label: string,
};

RadioField.defaultProps = {
  type: 'text',
  iconPalette: 'viridian',
};

RadioField.displayName = 'RadioField';

export default RadioField;
