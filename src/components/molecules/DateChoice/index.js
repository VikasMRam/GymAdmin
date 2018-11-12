import React, { Component, Fragment } from 'react';
import { arrayOf, string, func, bool } from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

import { size } from 'sly/components/themes';

import { BoxChoiceTile } from 'sly/components/atoms';

import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

const StyledBoxChoiceTile = styled(BoxChoiceTile)`
  height: ${size('element.xxxLarge')};
`;

export default class DateChoice extends Component {
  static propTypes = {
    from: string,
    to: string,
    hasLaterDate: bool,
    values: arrayOf(string).isRequired,
    onChange: func.isRequired,
  };

  static defaultProps = {
    values: [],
  };

  onClick(option) {
    const { values, onChange } = this.props;
    const index = values.indexOf(option);
    if (index === -1) {
      onChange([...values, option]);
    } else {
      const copy = [...values];
      copy.splice(index, 1);
      onChange(copy);
    }
  }

  render() {
    const {
      from, to, values, hasLaterDate,
    } = this.props;
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

    values.forEach((value, i) => {
      const parsedDate = moment(value, 'YYYY-MM-DD');
      values[i] = parsedDate.format('YYYY-MM-DD');
    });

    return (
      <Fragment>
        {options.map(option => (
          <DateChoiceTile
            key={option}
            selected={values.includes(option)}
            onClick={() => this.onClick(option)}
            date={option}
          />
        ))}
        {hasLaterDate &&
          <StyledBoxChoiceTile
            label="Later Date"
            onClick={() => this.onClick('later-date')}
          />
        }
      </Fragment>
    );
  }
}
