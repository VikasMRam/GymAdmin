/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';

import { Input } from 'sly/components/atoms';
import { phoneFormatter, phoneParser } from 'sly/services/helpers/phone';

export default class PhoneInput extends Component {
  static propTypes = {
    parens: bool,
    onChange: func,
    value: string,
  };

  static defaultProps = {
    parens: false,
  };

  state = {
    unformattedValue: phoneParser(this.props.value),
  };

  ref = React.createRef();

  format = (value) => {
    const { parens } = this.props;
    return phoneFormatter(value, parens);
  };

  onChange = (event) => {
    const { onChange } = this.props;
    const newValue = phoneParser(event.target.value);
    const { selectionStart } = event.target;
    const newPhone = this.format(event.target.value);
    let afterNumbers = phoneParser(event.target.value.slice(0, selectionStart)).length;
    let newPosition = 0;

    console.log('afterNumbers', newPhone, selectionStart, afterNumbers);
    for (let i = 0; i < newPhone.length; i++) {
      if (newPhone[i].match(/\d/)) {
        afterNumbers--;
      }
      newPosition++;
      if (afterNumbers <= 0) {
        break;
      }
    }
    console.log('newPosition', newPosition);
    window.requestAnimationFrame(() => {
      event.target.selectionStart = newPosition;
      event.target.selectionEnd = newPosition;
    });

    event.persist();
    this.setState(
      { unformattedValue: newValue },
      () => {
        event.target.value = newValue;
        onChange(event);
      },
    );
  };

  render() {
    const { unformattedValue } = this.state;
    const value = this.format(unformattedValue);
    return <Input {...this.props} value={value} onChange={this.onChange} type="text" />;
  }
}
