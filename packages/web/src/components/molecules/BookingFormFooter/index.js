import React from 'react';
import { oneOf, string, bool, func } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { getKey, palette, size } from 'sly/common/components/themes';
import { LATER_DATE } from 'sly/web/constants/date';
import { TIME_OPTIONS } from 'sly/web/constants/bookingForm';
import { Block, Button } from 'sly/web/components/atoms';

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
      const parsedDate = dayjs(date);
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
          <Block size="caption" palette="grey">
            Date Preference
          </Block>
          <div>
            {dateString}
          </div>
        </FirstPreferenceWrapper>
        <div>
          <Block size="caption" palette="grey">
            Time Preference
          </Block>
          <div>
            {timeString}
          </div>
        </div>
      </PreferenceWrapper>
      <StyledButton kind="jumbo" disabled={isButtonDisabled} background={paletteProp} onClick={onProgressClick}>
        {isFinalStep ? 'Send Tour Request' : 'Continue'}
      </StyledButton>
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
