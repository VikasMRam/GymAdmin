import React from 'react';
import { bool, oneOf } from 'prop-types';
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
  color: ${ifProp('invalid', palette('danger', 'base'), palette('slate', 'filler'))};
  background-color: ${palette('slate', 'background')};
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

const Input = ({ ...props }) => {
  if (props.type === 'textarea') {
    return <StyledTextarea {...props} />;
  } else if (props.type === 'select') {
    return <StyledSelect {...props} />;
  }
  return <StyledInput {...props} />;
};

Input.propTypes = {
  type: oneOf(['textarea', 'select', 'text', 'checkbox', 'radio', 'password', 'number']),
  size: oneOf(['small', 'regular', 'large', 'xLarge']),
  invalid: bool,
};

Input.defaultProps = {
  palette: 'stroke',
  type: 'text',
  size: 'regular',
};

export default Input;

