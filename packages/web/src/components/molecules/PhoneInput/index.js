/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { func, bool, string } from 'prop-types';

import { Input } from 'sly/web/components/atoms';
import { phoneFormatter, phoneParser } from 'sly/web/services/helpers/phone';

export default class PhoneInput extends Component {
  static propTypes = {
    parens: bool,
    onChange: func,
    value: string,
  };

  static defaultProps = {
    value: '',
    parens: false,
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

    if (afterNumbers > 0) {
      for (let i = 0; i < newPhone.length; i++) {
        if (newPhone[i].match(/\d/)) {
          afterNumbers--;
        }
        newPosition++;
        if (afterNumbers <= 0) {
          break;
        }
      }
    }

    window.requestAnimationFrame(() => {
      event.target.selectionStart = newPosition;
      event.target.selectionEnd = newPosition;
    });

    event.persist();
    event.target.value = newValue;
    return onChange(event);
  };

  render() {
    const value = this.format(this.props.value);
    return <Input {...this.props} value={value} onChange={this.onChange} type="text" />;
  }
}
