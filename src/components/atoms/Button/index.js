import React from 'react';
import styled, { css } from 'styled-components';
import { bool, string, oneOf } from 'prop-types';
import { ifProp, switchProp } from 'styled-tools';

import { palette as palettePropType } from 'sly/propTypes/palette';
import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';

const backgroundColor = ({
  ghost, transparent, selectable, selected, secondary,
}) => {
  if (ghost || (selectable && !selected)) {
    return palette('white', 'base');
  }
  if (secondary) {
    return palette('grey', 'background');
  }
  return transparent ? 'transparent' : palette('base');
};

const foregroundColor = ({
  ghost, transparent, selectable, selected,
  foregroundPalette, secondary,
}) => {
  if (ghost && !secondary) {
    return palette('base');
  }
  if (selectable && !selected) {
    return palette('slate', 'base');
  }
  if (secondary) {
    foregroundPalette = 'slate';
  }
  if (ghost && secondary) {
    foregroundPalette = 'grey';
  }
  return transparent ? 'none' : palette(foregroundPalette, 'base');
};

const borderColor = ({
  ghost, selectable, selected, secondary, borderPalette,
}) => {
  if ((selectable && !selected) || secondary) {
    return palette('slate', 'stroke');
  }
  if (ghost) {
    if (borderPalette) {
      return palette(borderPalette, 'stroke');
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
  ghost, selectable, selected, secondary,
}) => {
  if (ghost && !secondary) {
    return palette('dark');
  }
  return (selectable && !selected)
    ? palette('white', 'base')
    : null;
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

export const styles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: ${size('weight.medium')};
  white-space: nowrap;
  font-size: ${fontSize};
  border: ${size('border.regular')} solid ${borderColor};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  opacity: ${ifProp('disabled', 0.5, 1)};
  appearance: none;
  border-radius: ${size('border.xxLarge')};
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  user-select: none;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};
  ${switchProp('kind', {
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
    border-color: ${p => borderColor({ ...p, selected: true })};
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
  disabled, transparent, palette, height, theme, ...props
}) => (
  <Link {...props} />
))`
  ${styles};
`;

const Anchor = styled.a`
  ${styles};
`;
const StyledButton = styled.button`
  ${styles};
`;

const Button = ({ type, kind, ...props }) => {
  // rename type to kind to avoid collision with html button type
  if (props.to) {
    const { selectable, ...linkProps } = props;
    return <StyledLink kind={kind} {...linkProps} />;
  } else if (props.href) {
    return <Anchor kind={kind} {...props} />;
  }
  return <StyledButton {...props} kind={kind} type={type} />;
};

Button.propTypes = {
  disabled: bool,
  ghost: bool,
  secondary: bool,
  transparent: bool,
  palette: palettePropType,
  foregroundPalette: palettePropType,
  borderPalette: palettePropType,
  kind: oneOf(['jumbo', 'regular']),
  selectable: bool,
  selected: bool,
  type: string,
  to: string,
  href: string,
};

Button.defaultProps = {
  selectable: false,
  selected: true,
  palette: 'primary',
  kind: 'regular',
  type: 'button',
  foregroundPalette: 'white',
};

export default Button;
