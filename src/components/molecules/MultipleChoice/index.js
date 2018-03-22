import React, { Component } from 'react';
import { string, number, bool, func, oneOf, arrayOf, shape } from 'prop-types';
import styled from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const StyledDiv = styled.div`
`;

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
    values: arrayOf(string).isRequired,
  };

  static defaultProps = {
    values: [],
  };

  onClick(value) {
    const { values, onChange } = this.props;
    const index = values.indexOf(value);
    if (index === -1) {
      onChange([...values, value]);
    } else {
      onChange(values.splice(index, 1));
    }
  }

  render() {
    const { options, values } = this.props;
    return (
      <StyledDiv>
        {options && options
            .map(({ value, label }) => (
              <StyledButton reverse={values.includes(value)} key={value} onClick={() => this.onClick(value)}>
                {label}
              </StyledButton>
            ))}
      </StyledDiv>
    );
  }
}

