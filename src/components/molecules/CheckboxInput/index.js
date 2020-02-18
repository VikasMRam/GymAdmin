import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, oneOfType, boolean, arrayOf, object } from 'prop-types';

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

export default class CheckboxInput extends Component {
  static propTypes = {
    value: oneOfType([boolean, arrayOf(string)]),
    onChange: func,
    options: arrayOf(object),
    type: string,
    label: string,
  };

  constructor(props) {
    super(props);

    const { value } = props;
    if (Array.isArray(value)) {
      this.state = { value };
    }
  }

  state = {
    value: this.props.value,
  };

  handleCheckboxItemOnClick = (option) => {
    const { onChange, type } = this.props;
    const { value } = this.state;
    let newValue;
    if (type === 'boolean') {
      newValue = !value;
    } else {
      newValue = value ? [...value] : [];
      if (value.indexOf(option.value) === -1) {
        newValue.push(option.value);
      } else {
        newValue.splice(newValue.indexOf(option.value), 1);
      }
    }
    this.setState({ value: newValue }, () => {
      onChange(newValue);
    });
  };

  render() {
    const { type, label } = this.props;
    let { options } = this.props;
    const { value } = this.state;
    if (!options && type === 'boolean') {
      options = [{ value: true, label }];
    }

    return options.map((option) => {
      const checked = type === 'boolean'
        ? !!value === option.value
        : value.indexOf(option.value) !== -1;
      return (
        <CheckboxItem key={option.label} onClick={() => this.handleCheckboxItemOnClick(option)} >
          <StyledCheckbox
            palette="primary"
            uncheckedPalette="grey"
            checked={checked}
          />
          <CheckboxLabel size="caption">{option.label}</CheckboxLabel>
        </CheckboxItem>
      );
    });
  }
}
