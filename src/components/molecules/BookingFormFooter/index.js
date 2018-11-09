import React from 'react';
import { oneOf, string, bool, func } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { getKey, palette, size } from 'sly/components/themes';

import { Block, Button } from 'sly/components/atoms';

const datePlaceholder = 'Select a Date';
const timePlaceholder = 'Select a Time';

const Wrapper = styled.div`
  background-color: ${palette('slate', 'background')};
  display: flex;
  padding: ${size('spacing.xLarge')};
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    margin-bottom: 0;
  }
`;

const PreferenceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: 0;
  }
`;
PreferenceWrapper.displayName = 'PreferenceWrapper';

const FirstPreferenceWrapper = styled.div`
  width: calc((${size('layout.col1')} * 2) + (${size('layout.gutter')} * 2) );
`;


const BookingFormFooter = ({
  palette: paletteProp, date, time, finalStep, onProgressClick,
}) => {
  let dateString = date;
  if (date !== datePlaceholder) {
    const parsedDate = moment(date, 'YYYY-MM-DD');
    if (!parsedDate.isValid()) {
      dateString = 'Failed to parse date';
    } else {
      const dayName = parsedDate.format('dddd');
      const day = parsedDate.format('D');
      const month = parsedDate.format('MMM').toUpperCase();
      dateString = `${dayName}, ${month} ${day}`;
    }
  }

  return (
    <Wrapper>
      <PreferenceWrapper>
        <FirstPreferenceWrapper>
          <Block size="caption" variation="accent">
            Date Preference
          </Block>
          <div>
            {dateString}
          </div>
        </FirstPreferenceWrapper>
        <div>
          <Block size="caption" variation="accent">
            Time Preference
          </Block>
          <div>
            {time}
          </div>
        </div>
      </PreferenceWrapper>
      {finalStep && <Button kind="jumbo" palette={paletteProp} onClick={onProgressClick}>Send Tour Request</Button>}
      {!finalStep && <Button kind="jumbo" palette={paletteProp} onClick={onProgressClick}>Next</Button>}
    </Wrapper>
  );
};

BookingFormFooter.propTypes = {
  date: string,
  time: string,
  finalStep: bool,
  onProgressClick: func,
  palette: oneOf(Object.keys(getKey('palette'))),
};

BookingFormFooter.defaultProps = {
  date: datePlaceholder,
  time: timePlaceholder,
  palette: 'slate',
};

export default BookingFormFooter;
