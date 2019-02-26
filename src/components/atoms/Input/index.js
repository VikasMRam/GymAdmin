/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { bool, oneOf, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const height = p => size('element', p.size);
const backgroundColor = (p) => {
  if (p.disabled) {
    return palette('grey', 'stroke');
  }
  if (p.warning) {
    return palette('warning', 'stroke');
  }
  return p.invalid ? palette('danger', 'stroke') : palette('white', 'base');
};
const borderColor = (p) => {
  if (p.warning) {
    return palette('warning', 'base');
  }
  return p.invalid ? palette('danger', 'base') : palette('slate', 'stroke');
};
const focusBorderColor = (p) => {
  if (p.warning) {
    return palette('warning', 'base');
  }
  return p.invalid ? palette('danger', 'base') : palette('primary', 'base');
};

const styles = css`
  display: block;
  width: 100%;
  margin: 0;
  font-size: ${size('text', 'caption')};
  // todo: non standard padding. remove afterwards if added to theme
  padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')});
  height: ${ifProp({ type: 'textarea' }, size('element.huge'), height)};
  color: ${ifProp('disabled', palette('grey', 'base'), palette('slate', 'base'))};
  background-color: ${backgroundColor};
  border: ${size('border.regular')} solid ${borderColor};
  border-radius: ${size('border.xxLarge')};
  min-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};
  max-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};

  &:focus {
    outline: none;
    border-color: ${focusBorderColor};
  }

  &::placeholder {
    color: ${palette('stroke', 'filler')};
  }

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 ${size('spacing.small')} 0 0;
  }
`;

const StyledTextarea = styled.textarea`
  ${styles};
`;
const StyledSelect = styled.select`
  ${styles};
  background: ${palette('white', 'base')};
  color: ${palette('slate', 'base')};
`;
const StyledInput = styled.input`
  ${styles};
`;

class Input extends Component {
  ref = React.createRef();

  onFocus = (...args) => {
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
    if (this.ref && this.ref.current) {
      this.ref.current.scrollIntoView(true);
    }
  };

  render() {
    if (this.props.type === 'textarea') {
      return <StyledTextarea {...this.props} />;
    } else if (this.props.type === 'select') {
      return <StyledSelect {...this.props} />;
    }
    return <StyledInput {...this.props} onFocus={this.onFocus} autoComplete="new-password" />;
  }
}

Input.propTypes = {
  type: oneOf(['textarea', 'select', 'text', 'checkbox', 'radio', 'password', 'number']),
  size: oneOf(['small', 'regular', 'large', 'xLarge']),
  onFocus: func,
  invalid: bool,
  warning: bool,
};

Input.defaultProps = {
  palette: 'stroke',
  type: 'text',
  size: 'regular',
};

export default Input;
