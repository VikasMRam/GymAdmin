import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, oneOfType, bool, arrayOf, object } from 'prop-types';

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
    value: oneOfType([bool, arrayOf(string)]),
    onChange: func,
    options: arrayOf(object),
    type: string,
    label: string,
  };

  static defaultProps = {
    options: [],
    value: [],
  };

  handleCheckboxItemOnClick = (option) => {
    const { onChange, type, value } = this.props;
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
    return onChange(newValue);
  };

  render() {
    const { type, label, value } = this.props;
    let { options } = this.props;
    if (options.length === 0 && type === 'boolean') {
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
