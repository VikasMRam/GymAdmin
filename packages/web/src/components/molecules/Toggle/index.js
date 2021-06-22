import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func,  bool, arrayOf, object } from 'prop-types';


import { Toggle as ToggleIcon } from 'sly/common/icons';
import { space } from 'sly/common/system';

const StyledToggle = styled(ToggleIcon)`
  margin-right: ${space('xs')};
  cursor:pointer;
`;


export default class Toggle extends Component {
  static propTypes = {
    value: bool,
    onChange: func,
    options: arrayOf(object),
    readOnly: bool,
    type: string,
    label: string,
    enabledValue: string,
  };

  static defaultProps = {
    options: [],
  };

  handleClick = () => {
    const { onChange, value, readOnly, enabledValue } = this.props;
    if (readOnly) {
      return null;
    }
    if (enabledValue && value === 'disabled') {
      return onChange(enabledValue);
    }
    return onChange('disabled');
  };

  render() {
    const { value, readOnly } = this.props;


    return (
      <StyledToggle
        onClick={this.handleClick}
        verticalAlign="middle"
        size="l"
        color={value !== 'disabled' ? 'primary' : 'grey'}
        readOnly={readOnly}
        rotation={value !== 'disabled' ? '180' : '0'}
      />

    );
  }
}
