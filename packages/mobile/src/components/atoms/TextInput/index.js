import React from 'react';
import { bool, string, oneOf, number } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { element as elementPropType } from 'sly/common/propTypes/element';
import {
  withDisplay,
  withText,
  withColor,
  withSpacing,
  withBorder,
} from 'sly/common/components/helpers';

const StyledView = styled.View`
  ${withColor}
  ${withBorder}
  overflow: hidden;
`;

const StyledTextInput = styled.TextInput`
  ${withSpacing}
  ${withText}
  ${withColor}
  height: ${ifProp({ type: 'textarea' }, size('element.huge'), ({ height }) => size('element', height))};
  ${ifProp({ type: 'textarea' }, css`min-width: 100%;`)}
  ${ifProp({ type: 'textarea' }, css`max-width: 100%;`)}
  ${withDisplay}
`;

const TextInput = ({
  background, backgroundVariation, borderRadius, borderPalette,
  borderVariation, border, rows, size,
  ...props
}) => {
  const textInputProps = { background, backgroundVariation, ...props };

  if (textInputProps.disabled || textInputProps.readOnly) {
    textInputProps.palette = 'grey';
    textInputProps.background = 'grey';
    textInputProps.backgroundVariation = 'stroke';
  }
  if (textInputProps.warning) {
    textInputProps.background = 'warning';
    textInputProps.backgroundVariation = 'stroke';
    borderPalette = 'warning';
    borderVariation = 'base';
  }
  if (textInputProps.invalid) {
    textInputProps.background = 'danger';
    textInputProps.backgroundVariation = 'stroke';
    borderPalette = 'danger';
    borderVariation = 'base';
  }
  textInputProps.editable = textInputProps.disabled;
  textInputProps.multiline = textInputProps.type === 'textarea';
  textInputProps.numberOfLines = rows;
  // size in this component is it's height.
  // so translate it to height prop. As of now no font-size change is
  // required for inputs.
  textInputProps.height = size;

  const viewProps = {
    background: textInputProps.background,
    backgroundVariation: textInputProps.backgroundVariation,
    border,
    borderPalette,
    borderVariation,
    borderRadius,
  };

  // border radius style is not supported by TextInput.
  // Hence apply border styles on wrapper View.
  return (
    <StyledView {...viewProps}>
      <StyledTextInput {...textInputProps} />
    </StyledView>
  );
};

TextInput.propTypes = {
  type: oneOf(['search', 'textarea', 'text', 'email', 'password', 'number', 'locationSearch']),
  size: elementPropType,
  rows: number,
  disabled: bool,
  readOnly: bool,
  warning: bool,
  invalid: bool,
  border: string.isRequired,
  background: string.isRequired,
  backgroundVariation: string,
  borderRadius: string.isRequired,
  borderPalette: string.isRequired,
  borderVariation: string.isRequired,
};

TextInput.defaultProps = {
  rows: 3,
  padding: 'medium',
  size: 'button', // size in this component is it's height.
  palette: 'slate',
  background: 'white',
  borderRadius: 'regular',
  border: 'regular',
  borderPalette: 'slate',
  borderVariation: 'lighter-90',
};

export default TextInput;
