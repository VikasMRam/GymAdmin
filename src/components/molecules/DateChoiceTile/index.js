import React from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { size } from 'sly/components/themes';

import { Heading, BoxChoiceTile } from 'sly/components/atoms';

const StyledBoxChoiceTile = styled(BoxChoiceTile)`
  height: ${size('element.huge')};
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;
StyledHeading.displayName = 'StyledHeading';

const DateChoiceTile = ({
  date, selected, onClick,
}) => {
  const parsedDate = moment(date, 'YYYY-MM-DD');
  if (!parsedDate.isValid()) {
    return 'Failed to parse date';
  }
  const dayName = parsedDate.format('dddd');
  const day = parsedDate.format('D');
  const month = parsedDate.format('MMM').toUpperCase();

  return (
    <StyledBoxChoiceTile
      onClick={onClick}
      selected={selected}
    >
      <div>{dayName}</div>
      <StyledHeading size="title">{day}</StyledHeading>
      <div>{month}</div>
    </StyledBoxChoiceTile>
  );
};

DateChoiceTile.propTypes = {
  date: string,
  selected: bool,
  onClick: func,
};

export default DateChoiceTile;
