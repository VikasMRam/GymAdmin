import React from 'react';
import { oneOf, string, bool, func } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import { getKey, palette, size } from 'sly/components/themes';
import { LATER_DATE } from 'sly/constants/date';
import { TIME_OPTIONS } from 'sly/constants/bookingForm';
import { Block, Button } from 'sly/components/atoms';

const datePlaceholder = 'Select a Date';
const timePlaceholder = 'Select a Time';

const Wrapper = styled.div`
  background-color: ${palette('grey', 'stroke')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: ${size('spacing.large')} ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.large')};
  border-top: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    margin-bottom: 0;
  }
`;

const PreferenceWrapper = styled.div`
  display: none;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0;
  }
`;

const StyledButton = styled(Button)`
  width:100%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width:auto;
  }
`;
PreferenceWrapper.displayName = 'PreferenceWrapper';

const FirstPreferenceWrapper = styled.div`
  width: calc((${size('layout.col1')} * 2) + (${size('layout.gutter')} * 2) );
`;

const BookingFormFooter = ({
  palette: paletteProp, date, time, isFinalStep, onProgressClick,
  isButtonDisabled,
}) => {
  let dateString = date;
  if (date !== datePlaceholder) {
    if (date === LATER_DATE) {
      dateString = 'Later Date';
    } else {
      const parsedDate = moment(date, 'YYYY-MM-DD');
      if (!parsedDate.isValid()) {
        dateString = 'Failed to parse date';
      } else {
        const dayName = parsedDate.format('dddd');
        const day = parsedDate.format('D');
        const month = parsedDate.format('MMM');
        dateString = `${dayName}, ${month} ${day}`;
      }
    }
  }
  let timeString = time;
  const matchedTimeOption = TIME_OPTIONS.find(o => o.value === time);
  if (matchedTimeOption) {
    timeString = matchedTimeOption.label;
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
            {timeString}
          </div>
        </div>
      </PreferenceWrapper>
      {isFinalStep && <StyledButton kind="jumbo" disabled={isButtonDisabled} palette={paletteProp} onClick={onProgressClick}>Send Tour Request</StyledButton>}
      {!isFinalStep && <StyledButton kind="jumbo" disabled={isButtonDisabled} palette={paletteProp} onClick={onProgressClick}>Continue</StyledButton>}
    </Wrapper>
  );
};

BookingFormFooter.propTypes = {
  date: string,
  time: string,
  isFinalStep: bool,
  isButtonDisabled: bool,
  onProgressClick: func,
  palette: oneOf(Object.keys(getKey('palette'))),
};

BookingFormFooter.defaultProps = {
  date: datePlaceholder,
  time: timePlaceholder,
  palette: 'primary',
};

export default BookingFormFooter;
