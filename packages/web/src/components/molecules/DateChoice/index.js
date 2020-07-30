import React, { Component } from 'react';
import { arrayOf, oneOfType, string, number, func, bool } from 'prop-types';
import dayjs from 'dayjs';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { LATER_DATE } from 'sly/web/constants/date';
import { BoxChoiceTile } from 'sly/web/components/atoms';
import DateChoiceTile from 'sly/web/components/molecules/DateChoiceTile';

const StyledBoxChoiceTile = styled(BoxChoiceTile)`
  height: ${size('element.huge')};
`;
StyledBoxChoiceTile.displayName = 'StyledBoxChoiceTile';

const isSelected = (multiChoice, value, option) => (multiChoice)
  ? value.includes(option)
  : value === option;

export default class DateChoice extends Component {
  static propTypes = {
    from: string,
    to: string,
    hasLaterDate: bool,
    value: oneOfType([
      oneOfType([string, number]),
      arrayOf(oneOfType([string, number])),
    ]).isRequired,
    multiChoice: bool,
    onChange: func.isRequired,
  };

  static defaultProps = {
    value: [],
  };

  onClick(option) {
    const { value, onChange, multiChoice } = this.props;
    if (!multiChoice) {
      return onChange(option);
    }

    const index = value.indexOf(option);
    if (index === -1) {
      return onChange([...value, option]);
    }
    const copy = [...value];
    copy.splice(index, 1);
    return onChange(copy);
  }

  render() {
    const {
      from, to, hasLaterDate, multiChoice,
    } = this.props;
    let { value } = this.props;
    const parsedFromDate = dayjs(from);
    const parsedToDate = dayjs(to);
    if (!parsedFromDate.isValid() || !parsedToDate.isValid()) {
      return 'Failed to parse date';
    }

    const options = [];
    let currDate = parsedFromDate.startOf('day').add(1, 'day');
    const lastDate = parsedToDate.startOf('day');

    while (lastDate.diff(currDate, 'day') > 0) {
      options.push(currDate.clone().format('YYYY-MM-DD'));
      currDate = currDate.add(1, 'day');
    }

    if (multiChoice) {
      value.forEach((val, i) => {
        if (!hasLaterDate && val !== LATER_DATE) {
          const parsedDate = dayjs(val);
          value[i] = parsedDate.format('YYYY-MM-DD');
        }
      });
    } else if (!hasLaterDate && value !== LATER_DATE) {
      const parsedDate = dayjs(value);
      value = parsedDate.format('YYYY-MM-DD');
    }

    return (
      <>
        {options.map(option => (
          <DateChoiceTile
            key={option}
            selected={isSelected(multiChoice, value, option)}
            onClick={() => this.onClick(option)}
            date={option}
          />
        ))}
        {hasLaterDate &&
          <StyledBoxChoiceTile
            label="Later Date"
            selected={isSelected(multiChoice, value, LATER_DATE)}
            onClick={() => this.onClick(LATER_DATE)}
          />
        }
      </>
    );
  }
}
