import React, { Component } from 'react';
import styled from 'styled-components';
import { func, string, array } from 'prop-types';

const DatePicker = loadable(() => import(/* webpackChunkName: "chunkReactDatePicker" */'react-datepicker'));

import { size } from 'sly/components/themes';
import { Input } from 'sly/components/atoms';
import loadable from '@loadable/component';

const getDateFromValue = (value, pos) => value && Array.isArray(value)
  ? value[pos]
  : null;

const Wrapper = styled.div`
  display: flex;
  > * {
    width: calc(50% - ${size('spacing.regular')});
    margin-right: ${size('spacing.regular')};
  } 
  
  margin-right: -${size('spacing.regular')};
`;

export default class DateRange extends Component {
  static propTypes = {
    onChange: func.isRequired,
    size: string.isRequired,
    value: array,
  };

  state = {
    startDate: getDateFromValue(this.props.value, 0),
    endDate: getDateFromValue(this.props.value, 1),
  };

  setStartDate = (startDate) => {
    this.setState({ startDate }, this.onChange);
  };

  setEndDate = (endDate) => {
    this.setState({ endDate }, this.onChange);
  };

  onChange = () => {
    const { onChange } = this.props;
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      onChange([startDate, endDate]);
    }
  };

  render() {
    const { startDate, endDate } = this.state;
    const { size } = this.props;

    const customInput = <Input size={size} />;
    return (
      <Wrapper>
        <DatePicker
          selected={startDate}
          onChange={this.setStartDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          customInput={customInput}
        />
        <DatePicker
          selected={endDate}
          onChange={this.setEndDate}
          selectsEnd
          endDate={endDate}
          minDate={startDate}
          customInput={customInput}
        />
      </Wrapper>
    );
  }
}
