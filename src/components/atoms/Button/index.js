import React from 'react';
import styled, { css } from 'styled-components';
import { bool, string, oneOf, object } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
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
  ghost, transparent, selected, secondary, disabled, foregroundPalette,
}) => {
  if (foregroundPalette) {
    return palette(foregroundPalette, 'base');
  }
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
  ghost, secondary, borderPalette, borderVariation = 'stroke', disabled,
}) => {
  if (secondary) {
    return palette('slate', 'stroke');
  }
  if (ghost) {
    if (borderPalette) {
      return disabled ? palette(borderPalette, 'filler') : palette(borderPalette, borderVariation);
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

export const styles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: ${size('weight.medium')};
  font-size: ${fontSize};
  line-height: ${lineHeight};
  border: ${size('border.regular')} solid ${borderColor};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  border-radius: ${size('border.xxLarge')};
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  user-select: none;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  ${switchProp('kind', {
    tab: css`
      padding: ${size('spacing', 'regular')} ${size('spacing', 'large')};`,
    label: css`
      padding: 0 ${size('spacing', 'large')};
      height: ${size('element', 'regular')};`,
    regular: css`
      // todo: non standard padding. remove afterwards if added to theme
      padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')}) ${size('spacing.large')};`,
    jumbo: css`
      padding: ${size('spacing', 'large')} ${size('spacing', 'xxLarge')};`,
  })};

  &:hover {
    background-color: ${hoverBackgroundColor};
    color: ${hoverForegroundColor};
  }

  &:active {
    background-color: ${activeBackgroundColor};
    color: ${activeForegroundColor};
  }

  &:focus {
    outline: none;
  }
`;

const StyledLink = styled(({
  disabled, ghost, transparent, foregroundPalette, palette, height, theme, ...props
}) => (
  <Link noHoverColorChange {...props} />
))`
  ${styles};
`;

const StyledButton = styled.button`
  ${styles};
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
    return <StyledLink kind={kind} {...props} />;
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
  borderVariation: variationPropType,
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
  borderVariation: 'stroke',
};

export default Button;
