import React from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { size } from 'sly/components/themes';

import { Box, Heading } from 'sly/components/atoms';

const StyledBox = styled(Box)`
  height: ${size('element.xxxLarge')};
  text-align: center;
  cursor: pointer;
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;
StyledHeading.displayName = 'StyledHeading';

const DateChoiceTile = ({
  date, selected, onClick,
}) => {
  const parsedDate = moment(date, 'MM-DD-YYYY');
  if (!parsedDate.isValid()) {
    return 'Failed to parse date';
  }
  const dayName = parsedDate.format('dddd');
  const day = parsedDate.format('D');
  const month = parsedDate.format('MMM').toUpperCase();

  return (
    <StyledBox
      padding="regular"
      border={selected ? 'large' : 'regular'}
      palette={selected ? 'primary' : 'slate'}
      highlighted={selected}
      onClick={onClick}
    >
      <div>{dayName}</div>
      <StyledHeading size="title">{day}</StyledHeading>
      <div>{month}</div>
    </StyledBox>
  );
};

DateChoiceTile.propTypes = {
  date: string,
  selected: bool,
  onClick: func,
};

export default DateChoiceTile;
