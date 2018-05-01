import React, { Component } from 'react';
import {
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
} from 'prop-types';

import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const kind = type => {
  switch(type) {
    case 'multipletags': return 'label';
    default: return 'regular';
  }
};

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.small')};
  &:last-child {
    margin-right: none;
  }
`;

export default class MultipleChoice extends Component {
  static propTypes = {
    options: arrayOf(shape({
      value: oneOfType([string, number]).isRequired,
      label: string,
    })).isRequired,
    value: arrayOf(oneOfType([string, number])).isRequired,
  };

  static defaultProps = {
    value: [],
  };

  onClick(option) {
    const { value, onChange } = this.props;
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
    const { options, value, type, ...props } = this.props;
    return (
      <div {...props}>
        {options &&
          options.map(({ value: option, label, ...props }, i) => (
            <StyledButton
              selectable
              selected={value.includes(option)}
              key={option+i}
              kind={kind(type)}
              onClick={() => this.onClick(option)}
              {...props}
            >
              {label}
            </StyledButton>
          ))}
      </div>
    );
  }
}
