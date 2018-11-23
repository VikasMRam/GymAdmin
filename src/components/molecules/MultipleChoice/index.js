import React, { Component } from 'react';
import {
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
  bool,
} from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  button {
    flex: 1;
  }

  flex-wrap: wrap;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // hack % in AdvancedInfoForm
    ${ifProp('width', css`
      width: ${prop('width')};
    `)};
  }
`;

const StyledButton = styled(Button)`
  + Button {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  :not(:last-child) {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const isSelected = (type, value, option) => (type === 'singlechoice')
  ? value === option
  : value.includes(option);


export default class MultipleChoice extends Component {
  // TODO: INvalid
  static propTypes = {
    options: arrayOf(shape({
      value: oneOfType([string, number]).isRequired,
      label: string,
    })).isRequired,
    invalid: bool,
    value: oneOfType([
      oneOfType([string, number]),
      arrayOf(oneOfType([string, number])),
    ]).isRequired,
    type: oneOf(['multiplechoice', 'singlechoice']),
    width: string, // hack % in AdvancedInfoForm
    onBlur: func,
    onChange: func,
  };

  static defaultProps = {
    value: [],
  };

  onBlur = () => {
    const { onBlur, value } = this.props;
    onBlur(value);
  };

  onClick(option) {
    const { value, type, onChange } = this.props;

    if (type === 'singlechoice') {
      return onChange(option);
    }

    const index = value.indexOf(option);
    if (index === -1) {
      onChange([...value, option]);
    } else {
      const copy = [...value];
      copy.splice(index, 1);
      onChange(copy);
    }
    return null;
  }

  render() {
    const {
      options,
      value,
      type,
      onBlur,
      invalid,
      ...props
    } = this.props;

    return (
      <Wrapper onBlur={this.onBlur} {...props}>
        {options &&
          options.map(({ value: option, label }) => (
            <StyledButton
              selectable
              selected={isSelected(type, value, option)}
              key={option}
              onClick={() => this.onClick(option)}
            >
              {label}
            </StyledButton>
          ))}
      </Wrapper>
    );
  }
}
