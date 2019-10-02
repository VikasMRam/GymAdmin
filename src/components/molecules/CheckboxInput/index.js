import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, arrayOf, object } from 'prop-types';

import { size } from 'sly/components/themes';
import Checkbox from 'sly/components/molecules/Checkbox';
import { Span } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import cursor from 'sly/components/helpers/cursor';

const StyledCheckbox = styled(Checkbox)`
  margin-right: ${size('spacing', 'regular')};
`;

const CheckboxItem = cursor(pad(styled.div`
  :last-child {
    margin-bottom: 0;
  }
`, 'large'));

class CheckboxInput extends Component {
  propTypes={
    value: arrayOf(string),
    onChange: func,
    options: object,
  }
  constructor(props) {
    super(props);
    const { value } = props;
    if (value) {
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
        <CheckboxItem onClick={() => this.handleCheckboxItemOnClick(option)} >
          <StyledCheckbox
            key={option.label}
            palette="primary"
            uncheckedPalette="grey"
            checked={value.indexOf(option.value) !== -1}
          />
          <Span size="caption">{option.label}</Span>
        </CheckboxItem>
      );
    });
  }
}

export default CheckboxInput;
