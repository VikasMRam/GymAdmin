import React from 'react';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { TIME_OPTIONS } from 'sly/constants/booking';
import { Heading, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const medicaidOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: "I'm not sure", value: 'not-sure' },
];

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledField = styled(Field)`
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: repeat(auto-fit, calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2));
  margin-bottom: ${size('spacing.xLarge')};
`;
StyledField.displayName = 'StyledField';

const StyledTimeField = StyledField.extend`
  > * {
    height: ${size('element.xLarge')};
  }
`;
StyledTimeField.displayName = 'StyledTimeField';

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const MedicaidLabel = StyledBlock.extend`
  display: flex;
  align-items: center;
`;

// const StyledIcon = styled(Icon)`
//   margin-left: ${size('spacing.small')};
// `;

const CommunitySATDateForm = ({
  error, onDateChange, onTimeChange, handleSubmit,
}) => {
  const from = moment();
  const to = moment().add(8, 'days');

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
      <MedicaidLabel size="caption">
        Do you qualify for medicaid?
        {/* <StyledIcon icon="help" size="regular" palette="slate" variation="filler" /> */}
      </MedicaidLabel>
      <StyledTimeField
        options={medicaidOptions}
        name="medicaidCoverage"
        type="boxChoice"
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
    </form>
  );
};

CommunitySATDateForm.propTypes = {
  error: string,
  onDateChange: func,
  onTimeChange: func,
  handleSubmit: func,
};

export default CommunitySATDateForm;
