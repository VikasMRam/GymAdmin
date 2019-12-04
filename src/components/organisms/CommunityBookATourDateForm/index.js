import React from 'react';
import { string, func, bool } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Field } from 'redux-form';

import { size, gridColumns } from 'sly/components/themes';
import { TIME_OPTIONS, MEDICAID_OPTIONS } from 'sly/constants/bookingForm';
import { Heading, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import HelpBubble from 'sly/components/molecules/HelpBubble';

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const regular = size('spacing.regular');
const large = size('spacing.large');

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};

  ${gridColumns(3, regular)};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(4, large)};
  }
`;
StyledField.displayName = 'StyledField';

const StyledTimeField = styled(StyledField)`
  > * {
    height: ${size('element.large')};
    font-size: ${size('text.caption')};
  }
`;
StyledTimeField.displayName = 'StyledTimeField';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const MedicaidLabel = styled(StyledBlock)`
  display: flex;
  align-items: center;
`;

const StyledHelpBubble = styled(HelpBubble)`
  margin-left: ${size('spacing.small')};
`;

const CommunityBookATourDateForm = ({
  error, onDateChange, onTimeChange, handleSubmit, medicaidCoverage,
}) => {
  const from = dayjs();
  const to = dayjs().add(8, 'days');

  return (
    <form onSubmit={handleSubmit}>
      <HeadingSection level="subtitle" size="subtitle">Schedule a Tour</HeadingSection>
      <StyledBlock size="caption">What day did you want to tour?</StyledBlock>
      <StyledField
        hasLaterDate
        from={from.format('YYYY-MM-DD')}
        to={to.format('YYYY-MM-DD')}
        name="scheduledDate"
        type="dateChoice"
        component={ReduxField}
        onChange={onDateChange}
      />
      <StyledBlock size="caption">What time works best for you?</StyledBlock>
      <StyledTimeField
        options={TIME_OPTIONS}
        name="scheduledTime"
        type="boxChoice"
        component={ReduxField}
        onChange={onTimeChange}
      />
      {!medicaidCoverage &&
        <>
          <MedicaidLabel size="caption">
            Do you qualify for Medicaid?
            <StyledHelpBubble>
              Typically, Medicare and Medicaid cannot be used for monthly rent in long-term care communities.<br />
              However, veteran&apos;s benefits and long term care insurance can help bridge the cost.
            </StyledHelpBubble>
          </MedicaidLabel>
          <StyledTimeField
            options={MEDICAID_OPTIONS}
            name="medicaidCoverage"
            type="boxChoice"
            component={ReduxField}
          />
        </>
      }
      {error && <Block palette="danger">{error}</Block>}
    </form>
  );
};

CommunityBookATourDateForm.propTypes = {
  error: string,
  medicaidCoverage: string,
  onDateChange: func,
  onTimeChange: func,
  handleSubmit: func,
};

export default CommunityBookATourDateForm;
