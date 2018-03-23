import React, { Component } from 'react';
import { string, number, bool, func, oneOf, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const StyledDiv = styled.div``;

const StyledButton = styled(Button)`
  margin-right: ${size('spacing.small')};
  &:last-child {
    margin-right: none;
  }
`;

export default class MultipleChoice extends Component {
  static propTypes = {
    options: arrayOf(shape({
      value: string.isRequired,
      label: string,
    })).isRequired,
    value: arrayOf(string).isRequired,
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
    const { options, value } = this.props;
    return (
      <StyledDiv>
        {options &&
          options.map(({ value: option, label }) => (
            <StyledButton
              reverse={value.includes(option)}
              key={option}
              onClick={() => this.onClick(option)}
            >
              {label}
            </StyledButton>
          ))}
      </StyledDiv>
    );
  }
}
