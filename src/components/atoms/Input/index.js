import React from 'react';
import { string, bool, number, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes/default';

const styles = css`
  display: block;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-size: ${size('text', 'body')};
  padding: ${size('padding', 'regular')};
  height: ${ifProp({ type: 'textarea' }, 'auto', size('height', 'regular'))};
  color: ${ifProp('invalid', palette('danger', 0), palette('grayscale', 0))};
  background-color: ${palette('whites', 2)};
  border: 1px solid
    ${ifProp('invalid', palette('danger', 2), palette('grayscale', 2))};
  border-radius: 2px;

  &:focus {
    outline: none;
    border-color: ${ifProp('invalid', palette('danger', 2), palette('primary', 0))};
  }

  &::placeholder {
    color: ${palette(2)};
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
  type: oneOf(['textarea', 'select', 'text', 'checkbox', 'radio']),
  height: number,
  invalid: bool,
};

Input.defaultProps = {
  palette: 'grayscale',
  type: 'text',
  height: 40,
};

export default Input;
