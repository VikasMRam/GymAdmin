/* eslint-disable react/sort-comp */

import React, { Component } from 'react';
import { bool, oneOf, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';

const height = p => size('element', p.size);
const styles = css`
  display: block;
  width: 100%;
  margin: 0;
  font-size: ${size('text', 'body')};
  padding: ${size('padding', 'regular')};
  height: ${ifProp({ type: 'textarea' }, size('element.textarea'), height)};
  color: ${ifProp('invalid', palette('danger', 'base'), palette('slate', 'base'))};
  background-color: ${palette('white', 'base')};
  border: 1px solid
    ${ifProp('invalid', palette('danger', 'stroke'), palette('slate', 'stroke'))};
  border-radius: 2px;

  &:focus {
    outline: none;
    border-color: ${ifProp(
    'invalid',
    palette('danger', 'stroke'),
    palette('primary', 'base')
  )};
  }

  &::placeholder {
    color: ${palette('stroke')};
  }

  &[type='checkbox'],
  &[type='radio'] {
    display: inline-block;
    border: 0;
    border-radius: 0;
    width: auto;
    height: auto;
    margin: 0 0.2rem 0 0;
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
    return <StyledInput {...this.props} onFocus={this.onFocus} />;
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

