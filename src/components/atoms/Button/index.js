import React from 'react';

import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import Link from 'react-router-dom/Link';

import { bool, string, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';

const backgroundColor = ({ ghost, disabled, transparent, selectable, selected }) =>
  disabled
    ? palette('white', 1)
    : ghost || (selectable && !selected)
      ? palette('white', 2)
      : transparent ? 'transparent' : palette(0);

const foregroundColor = ({ ghost, disabled, transparent, selectable, selected }) =>
  disabled
    ? palette('grayscale', 2)
    : ghost
      ? palette(0)
      : (selectable && !selected)
        ? palette('grayscale', 1)
        : transparent ? 'none' : palette('white', 2);

const borderColor = ({ ghost, disabled, selectable, selected }) => {
  if (selectable && !selected) {
    return palette('grayscale', 2);
  } else {
    return ghost || disabled ? 'currentcolor' : 'transparent';
  }
};

const hoverBackgroundColor = ({ disabled, ghost, transparent }) =>
  !disabled && !ghost && !transparent && palette(1);

const hoverForegroundColor = ({ disabled, ghost, selectable, selected }) =>
  (selectable && !selected)
    ? palette('white', 2)
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
    case 'label':
      return size('spacing.small');
    default:
      return size('spacing.tiny');
  }
};

const styles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${height};
  padding: 0 1em;
  text-transform: ${ifProp({ kind: 'label' }, 'uppercase', 'none')};
  text-decoration: none;
  white-space: nowrap;
  font-size: ${fontSize};
  border: ${size('border')} solid ${borderColor};
  cursor: ${ifProp('disabled', 'default', 'pointer')};
  appearance: none;
  border-radius: ${borderRadius};
  box-sizing: border-box;
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};

  pointer-events: ${ifProp('disabled', 'none', 'auto')};

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
  palette: 'secondary',
  kind: 'regular',
  type: 'button',
};

export default Button;
