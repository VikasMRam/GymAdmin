import React from 'react';
import { string, bool, func } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { size } from 'sly/common/components/themes';
import { Heading, BoxChoiceTile } from 'sly/web/components/atoms';

const StyledBoxChoiceTile = styled(BoxChoiceTile)`
  height: ${size('element.huge')};
  flex-direction: column;
`;

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const StyledDiv = styled.div`
  font-size: ${size('text.caption')}
`;
StyledHeading.displayName = 'StyledHeading';

const DateChoiceTile = ({
  date, selected, onClick,
}) => {
  const parsedDate = dayjs(date);
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
      <StyledDiv>{dayName}</StyledDiv>
      <StyledHeading size="title">{day}</StyledHeading>
      <StyledDiv>{month}</StyledDiv>
    </StyledBoxChoiceTile>
  );
};

DateChoiceTile.propTypes = {
  date: string,
  selected: bool,
  onClick: func,
};

export default DateChoiceTile;
