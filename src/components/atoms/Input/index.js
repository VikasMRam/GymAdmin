/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { bool, oneOf, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette, assetPath } from 'sly/components/themes';

const backgroundColor = (p) => {
  if (p.disabled || p.readOnly) {
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
const color = (p) => {
  return (p.disabled || p.readOnly) ? palette('grey', 'base') : palette('slate', 'base');
};


const StyledTextarea = styled.textarea`
`;

const StyledSelect = styled.select`
  background: ${palette('white', 'base')};
  color: ${palette('slate', 'base')};
  height: ${size('element', 'button')};
`;
const StyledInput = styled.input`
`;

export default class Input extends Component {
  static propTypes = {
    type: oneOf(['search', 'textarea', 'select', 'text', 'checkbox', 'radio', 'password', 'number', 'hidden', 'date', 'locationSearch']),
    size: oneOf(['small', 'regular', 'button', 'large', 'xLarge']),
    onFocus: func,
    invalid: bool,
    readOnly: bool,
    warning: bool,
  };

  static defaultProps = {
    palette: 'stroke',
    type: 'text',
    size: 'button',
  };

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
