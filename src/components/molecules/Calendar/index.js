import React, { Component } from 'react';

import {
  oneOf,
  oneOfType,
  arrayOf,
  shape,
  string,
  number,
  func,
  bool,
} from 'prop-types';

import styled, { css } from 'styled-components';
import { font, palette } from 'styled-theme';
import { ifProp, prop } from 'styled-tools';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { size } from 'sly/components/themes';
import { Button } from 'sly/components/atoms';

const datePickerCss = require(`!raw-loader!react-datepicker/dist/react-datepicker.css`);

const Wrapper = styled.div`
  ${datePickerCss};
`;

export default class Calendar extends Component {
  // TODO: INvalid
  static propTypes = {
    invalid: bool,
    value: string.isRequired,
    type: oneOf(['datetime']).isRequired,
    width: string, // hack % in AdvancedInfoForm
  };

  static defaultProps = {
    value: new Date(),
  };

  onBlur = () => {
    const { onBlur, value } = this.props;
    onBlur(value);
  };

  render() {
    const {
      options,
      value,
      type,
      onBlur,
      invalid,
      ...props
    } = this.props;

    return (
      <Wrapper onBlur={this.onBlur} {...props}>
        <DatePicker
          inline
          selected={value}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />
      </Wrapper>
    );
  }
}
