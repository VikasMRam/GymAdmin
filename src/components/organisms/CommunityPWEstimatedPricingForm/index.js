import React from 'react';
import { string, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';
import { Heading, Block } from 'sly/components/atoms';

const roomTypeOptions = [
  { label: 'Suite', value: 'suite' },
  { label: '1 Bedroom', value: '1-bedroom' },
  { label: '2 Bedroom', value: '2-bedroom' },
  { label: "I'm not sure", value: 'i-am-not-sure' },
];

const careTypeOptions = [
  { label: 'Memory Care', value: 'memory-care' },
  { label: 'Palliative Care', value: 'palliative-care' },
  { label: 'Medication Management', value: 'medication-management' },
  { label: 'Physical Therapy', value: 'physical-therapy' },
  { label: 'Parkinsons Care', value: 'parkinsons-care' },
  { label: 'Diabetes Care', value: 'diabetes-care' },
  { label: 'None', value: 'none' },
  { label: 'Other', value: 'other' },
];

const medicaidOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const StyledField = styled(Field)`
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: repeat(auto-fit, calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2));
  margin-bottom: ${size('spacing.xLarge')};

  > * {
    height: ${size('element.xLarge')};
  }
`;

const CareTypesField = StyledField.extend`
  grid-template-columns: repeat(auto-fit, ${size('layout.col3')});
`;

const CommunityPWEstimatedPricingForm = ({
  error, handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <HeadingSection level="subtitle" size="subtitle">Get your custom pricing with Sagebrook Senior Living</HeadingSection>
    <StyledBlock size="caption">What type of room are you looking for?</StyledBlock>
    <StyledField
      options={roomTypeOptions}
      name="roomType"
      type="boxChoice"
      component={ReduxField}
      multiChoice
    />
    <StyledBlock size="caption">What type of care needs do you have?</StyledBlock>
    <CareTypesField
      options={careTypeOptions}
      name="careType"
      type="boxChoice"
      component={ReduxField}
      multiChoice
    />
    <StyledBlock size="caption">
      Do you qualify for medicaid?
    </StyledBlock>
    <StyledField
      options={medicaidOptions}
      name="medicaidCoverage"
      type="boxChoice"
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
  </form>
);

CommunityPWEstimatedPricingForm.propTypes = {
  error: string,
  handleSubmit: func,
};

export default CommunityPWEstimatedPricingForm;
