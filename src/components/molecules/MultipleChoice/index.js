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

import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.small')};
  &:last-child {
    margin-right: none;
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
      <div onBlur={this.onBlur} {...props}>
        {options &&
          options.map(({ value: option, label, ...props }, i) => (
            <StyledButton
              selectable
              selected={isSelected(type, value, option)}
              key={option+i}
              onClick={() => this.onClick(option)}
            >
              {label}
            </StyledButton>
          ))}
      </div>
    );
  }
}
