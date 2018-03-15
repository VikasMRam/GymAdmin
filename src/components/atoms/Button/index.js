import React from 'react';

import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';
import Link from 'react-router-dom/Link';

import {
  bool,
  string,
  oneOf
} from 'prop-types';

import { size } from 'sly/components/themes/default';

const backgroundColor = ({ ghost, disabled }) =>
  disabled
    ? palette('white', 1)
    : ghost ? palette('white', 2) : palette(0);

const foregroundColor = ({ ghost, disabled }) =>
  disabled
    ? palette('grayscale', 2)
    : ghost ? palette(0) : palette('white', 2);

const borderColor = ({ ghost, disabled }) =>
  (ghost || disabled)
    ? 'currentcolor'
    : 'transparent';

const hoverBackgroundColor = ({ disabled, ghost }) =>
  !disabled && !ghost && palette(1);

const hoverForegroundColor = ({ disabled, ghost }) =>
  !disabled && ghost && palette(1);

const activeBackgroundColor = ({ disabled, ghost }) =>
  !disabled && !ghost && palette(2);

const activeForegroundColor = ({ disabled, ghost }) =>
  !disabled && ghost && palette(2);

const height = ({ kind }) => {
  switch (kind) {
    case 'jumbo': return size('element.xLarge');
    case 'label': return size('element.small');
    default: return size('element.regular');
  }
};

const fontSize = ({ kind }) => {
  switch (kind) {
    case 'jumbo': return size('text', 'subtitle');
    case 'label': return size('text', 'caption');
    default: return size('text', 'body');
  }
};

const borderRadius = ({ kind }) => {
  switch (kind) {
    case 'jumbo':
    case 'label':
      return size('borderRadius', 'large');
    default:
      return size('borderRadius', 'regular');
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

const Button = ({ type, buttonType, ...props }) => {
  // rename type to kind to avoid collision with html button type
  const kind = type;
  if (props.to) {
    return <StyledLink kind={kind} {...props} />;
  } else if (props.href) {
    return <Anchor kind={kind} {...props} />;
  }
  return <StyledButton {...props} kind={kind} type={buttonType} />;
};

Button.propTypes = {
  disabled: bool,
  ghost: bool,
  palette: string,
  type: oneOf(['jumbo', 'regular', 'label']),

  buttonType: string,
  to: string,
  href: string,
};

Button.defaultProps = {
  palette: 'secondary',
  type: 'regular',

  buttonType: 'button',
};

export default Button;

