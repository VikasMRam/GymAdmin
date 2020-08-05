import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, oneOfType, bool, arrayOf, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import Checkbox from 'sly/web/components/molecules/Checkbox';
import { Block } from 'sly/common/components/atoms';
import cursor from 'sly/web/components/helpers/cursor';

const StyledCheckbox = cursor(styled(Checkbox)`
  margin-right: ${size('spacing', 'regular')};
`);

const CheckboxLabel = cursor(Block);

export default class CheckboxInput extends Component {
  static propTypes = {
    value: oneOfType([bool, arrayOf(string)]),
    onChange: func,
    options: arrayOf(object),
    readOnly: bool,
    type: string,
    label: string,
  };

  static defaultProps = {
    options: [],
    value: [],
  };

  handleCheckboxItemOnClick = (option) => {
    const { onChange, type, value, readOnly } = this.props;
    if (readOnly) {
      return null;
    }
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
    const { type, label, value, readOnly, ...props } = this.props;
    let { options } = this.props;
    if (options.length === 0 && type === 'boolean') {
      options = [{ value: true, label }];
    }

    return options.map((option) => {
      const checked = type === 'boolean'
        ? !!value === option.value
        : value.indexOf(option.value) !== -1;
      return (
        <Block
          display="flex"
          verticalAlign="middle"
          key={option.label}
          onClick={() => this.handleCheckboxItemOnClick(option)}
          {...props}
        >
          <StyledCheckbox
            palette={readOnly ? 'grey' : 'primary'}
            uncheckedPalette="grey"
            readOnly={readOnly}
            checked={checked}
          />
          <CheckboxLabel display="inline" size="caption">{option.label}</CheckboxLabel>
        </Block>
      );
    });
  }
}
