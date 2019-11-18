import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import Checkbox from 'sly/components/molecules/Checkbox';
import { Span } from 'sly/components/atoms';
import cursor from 'sly/components/helpers/cursor';

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = cursor(styled(Checkbox)`
  margin-right: ${size('spacing', 'regular')};
`);

const CheckboxLabel = cursor(Span);

class CheckboxInput extends Component {
  static propTypes={
    value: arrayOf(string),
    onChange: func,
    options: arrayOf(object),
  }
  constructor(props) {
    super(props);
    const { value } = props;
    if (Array.isArray(value)) {
      this.state = { value };
    }
  }
  state = {
    value: [],
  }
  handleCheckboxItemOnClick = (option) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const newValue = [...value];
    if (value.indexOf(option.value) === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(newValue.indexOf(option.value), 1);
    }
    this.setState({ value: newValue });
    return onChange ? onChange(newValue) : null;
  }
  render() {
    let { options } = this.props;
    const { value } = this.state;
    if (!options) {
      options = [{ value: true }];
    }
    return options.map((option) => {
      return (
        <CheckboxItem key={option.label} onClick={() => this.handleCheckboxItemOnClick(option)} >
          <StyledCheckbox
            palette="primary"
            uncheckedPalette="grey"
            checked={value.indexOf(option.value) !== -1}
          />
          <CheckboxLabel size="caption">{option.label}</CheckboxLabel>
        </CheckboxItem>
      );
    });
  }
}

export default CheckboxInput;
