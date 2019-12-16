import React from 'react';
import styled, { css } from 'styled-components';
import { bool, string, oneOf, object } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';
import SlyEvent from 'sly/services/helpers/events';

const backgroundColor = ({
  ghost, transparent, selected, secondary, disabled,
}) => {
  if (ghost) {
    return selected ? palette('stroke') : palette('white', 'base');
  }
  if (transparent) {
    return 'transparent';
  }
  if (secondary) {
    return disabled ? palette('grey', 'background') : palette('grey', 'background');
  }
  return disabled ? palette('filler') : palette('base');
};

const foregroundColor = ({
  ghost, transparent, selected, secondary, disabled,
}) => {
  if (ghost) {
    if (secondary) {
      return disabled ? palette('grey', 'filler') : palette('grey', 'base');
    }
    return disabled ? palette('primary', 'filler') : palette('base');
  }
  if (transparent) {
    return 'none';
  }
  if (secondary) {
    return disabled ? palette('slate', 'filler') : palette('slate', 'base');
  }
  return selected ? palette('slate', 'base') : palette('white', 'base');
};

const borderColor = ({
  ghost, secondary, borderPalette, disabled,
}) => {
  if (secondary) {
    return palette('slate', 'stroke');
  }
  if (ghost) {
    if (borderPalette) {
      return disabled ? palette(borderPalette, 'filler') : palette(borderPalette, 'stroke');
    }
    return 'currentcolor';
  }
  return 'transparent';
};

const hoverBackgroundColor = ({
  disabled, ghost, transparent, secondary,
}) => {
  if (secondary && !ghost) {
    return palette('grey', 'stroke');
  }
  return !disabled && !ghost && !transparent && palette('dark');
};

const hoverForegroundColor = ({
  ghost, secondary,
}) => {
  if (ghost) {
    return secondary ? palette('grey', 'dark') : palette('dark');
  }
  return null;
};

const activeBackgroundColor = ({ disabled, ghost, transparent }) =>
  !disabled && !ghost && !transparent && palette('filler');

const activeForegroundColor = ({ disabled, ghost }) =>
  !disabled && ghost && palette('filler');

const fontSize = ({ kind }) => {
  switch (kind) {
    case 'jumbo':
      return size('text', 'body');
    default:
      return size('text', 'caption');
  }
};

// TODO: Check with Jared and correct Line heights of Buttons Texts
const lineHeight = ({ kind }) => {
  switch (kind) {
    case 'tab':
      return size('lineHeight', 'caption');
    case 'jumbo':
      return size('lineHeight', 'body');
    default:
      return size('lineHeight', 'title');
  }
};


const StyledLink = styled(({
  disabled, ghost, transparent, foregroundPalette, palette, height, theme, ...props
}) => (
  <Link noHoverColorChange {...props} />
))`
`;

const StyledButton = styled.button`
`;

const withSendEvent = ({ onClick, event, ...props }) => {
  return {
    ...props,
    onClick: event ? (e) => {
      SlyEvent.getInstance().sendEvent(event);
      return onClick(e);
    } : onClick,
  };
};

const Button = ({ type, kind, measureRef, ...props }) => {
  // rename type to kind to avoid collision with html button type
  if (props.to || props.href) {
    return <StyledLink ref={measureRef} kind={kind} {...props} />;
  }
  return <StyledButton ref={measureRef} {...withSendEvent(props)} kind={kind} type={type} />;
};

Button.propTypes = {
  disabled: bool,
  ghost: bool,
  secondary: bool,
  transparent: bool,
  palette: palettePropType,
  foregroundPalette: palettePropType,
  borderPalette: palettePropType,
  kind: oneOf(['jumbo', 'regular', 'tab', 'plain']),
  selected: bool,
  type: string,
  to: string,
  href: string,
  measureRef: object,
};

Button.defaultProps = {
  palette: 'primary',
  kind: 'regular',
  type: 'button',
  foregroundPalette: 'white',
};

export default Button;
