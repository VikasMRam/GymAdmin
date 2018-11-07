import React from 'react';
import { oneOf, bool, func } from 'prop-types';
import styled from 'styled-components';

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

const DateChoiceTile = ({
  dayName, day, month, selected, onClick,
}) => (
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

DateChoiceTile.propTypes = {
  dayName: oneOf(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).isRequired,
  day: oneOf([...(new Array(30))].map((_, i) => i + 1)).isRequired,
  month: oneOf(['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']).isRequired,
  selected: bool,
  onClick: func,
};

export default DateChoiceTile;
