import React from 'react';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { bool, string, oneOf } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import Link from 'sly/components/atoms/Link';

const backgroundColor = ({
  ghost, disabled, transparent, selectable, selected,
}) => {
  if (disabled) {
    return palette('white', 0);
  }
  if (ghost || (selectable && !selected)) {
    return palette('white', 0);
  }
  return transparent ? 'transparent' : palette(0);
};

const foregroundColor = ({
  ghost, disabled, transparent, selectable, selected,
}) => {
  if (disabled) {
    return palette('slate', 'stroke');
  }
  if (ghost) {
    return palette(0);
  }
  if (selectable && !selected) {
    return palette('slate', 0);
  }
  return transparent ? 'none' : palette('white', 0);
};

const borderColor = ({
  ghost, disabled, selectable, selected,
}) => {
  if (selectable && !selected) {
    return palette('slate', 'stroke');
  }
  return ghost || disabled ? 'currentcolor' : 'transparent';
};

const hoverBackgroundColor = ({ disabled, ghost, transparent }) =>
  !disabled && !ghost && !transparent && palette(1);

const hoverForegroundColor = ({
  disabled, ghost, selectable, selected,
}) =>
  (selectable && !selected)
    ? palette('white', 0)
    : !disabled && ghost && palette(1);

const activeBackgroundColor = ({ disabled, ghost, transparent }) =>
  !disabled && !ghost && !transparent && palette(2);

const activeForegroundColor = ({ disabled, ghost }) =>
  !disabled && ghost && palette(2);

const height = ({ kind }) => {
  switch (kind) {
    case 'jumbo':
      return size('element.xLarge');
    case 'label':
      return size('element.small');
    default:
      return size('element.regular');
  }
};

const fontSize = ({ kind }) => {
  switch (kind) {
    case 'jumbo':
      return size('text', 'subtitle');
    case 'label':
      return size('text', 'caption');
    default:
      return size('text', 'body');
  }
};

const borderRadius = ({ kind }) => {
  switch (kind) {
    case 'jumbo':
      return size('spacing.small');
    case 'label':
    default:
      return size('spacing.tiny');
  }
};

export const styles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${height};
  padding: 0 1em;
  text-decoration: none;
  font-weight: ${ifProp({ kind: 'jumbo' }, '500', 'normal')};
  white-space: nowrap;
  font-size: ${fontSize};
  border: ${size('border.regular')} solid ${borderColor};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  border-radius: ${borderRadius};
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  user-select: none;
  pointer-events: ${ifProp('disabled', 'none', 'auto')};

  &:hover {
    border-color: ${borderColor({ selected: true })};
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
    return <StyledLink kind={kind} {...props} />;
  } else if (props.href) {
    return <Anchor kind={kind} {...props} />;
  }
  return <StyledButton {...props} kind={kind} type={type} />;
};

Button.propTypes = {
  disabled: bool,
  ghost: bool,
  transparent: bool,
  palette: string,
  kind: oneOf(['jumbo', 'regular', 'label']),
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
};

export default Button;
