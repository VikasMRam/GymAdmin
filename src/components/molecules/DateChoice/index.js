import React, { Component, Fragment } from 'react';
import { arrayOf, oneOfType, string, number, func, bool } from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import { BoxChoiceTile } from 'sly/components/atoms';
import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

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
    const parsedFromDate = moment(from, 'YYYY-MM-DD');
    const parsedToDate = moment(to, 'YYYY-MM-DD');
    if (!parsedFromDate.isValid() || !parsedToDate.isValid()) {
      return 'Failed to parse date';
    }
    const options = [];
    const currDate = parsedFromDate.startOf('day');
    const lastDate = parsedToDate.startOf('day');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      options.push(currDate.clone().format('YYYY-MM-DD'));
    }

    if (multiChoice) {
      value.forEach((val, i) => {
        if (!hasLaterDate && val !== 'later-date') {
          const parsedDate = moment(val, 'YYYY-MM-DD');
          value[i] = parsedDate.format('YYYY-MM-DD');
        }
      });
    } else if (!hasLaterDate && value !== 'later-date') {
      const parsedDate = moment(value, 'YYYY-MM-DD');
      value = parsedDate.format('YYYY-MM-DD');
    }

    return (
      <Fragment>
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
            selected={isSelected(multiChoice, value, 'later-date')}
            onClick={() => this.onClick('later-date')}
          />
        }
      </Fragment>
    );
  }
}
