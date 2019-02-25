/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { bool, oneOf, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const height = p => size('element', p.size);
const color = (p) => {
  if (p.disabled) {
    return palette('grey', 'base');
  }
  return p.invalid ? palette('danger', 'base') : palette('slate', 'base');
};

const styles = css`
  display: block;
  width: 100%;
  margin: 0;
  font-size: ${size('text', 'caption')};
  // todo: non standard padding. remove afterwards if added to theme
  padding: calc(${size('spacing', 'regular')} + ${size('spacing', 'small')});
  height: ${ifProp({ type: 'textarea' }, size('element.huge'), height)};
  color: ${color};
  background-color: ${ifProp('disabled', palette('grey', 'stroke'), palette('white', 'base'))};
  border: ${size('border.regular')} solid
    ${ifProp('invalid', palette('danger', 'stroke'), palette('slate', 'stroke'))};
  border-radius: ${size('border.xxLarge')};
  min-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};
  max-width: ${ifProp({ type: 'textarea' }, '100%', 'initial')};

  &:focus {
    outline: none;
    border-color: ${ifProp(
    'invalid',
    palette('danger', 'stroke'),
    palette('primary', 'base')
  )};
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
};

Input.defaultProps = {
  palette: 'stroke',
  type: 'text',
  size: 'regular',
};

export default Input;
