import React from 'react';
import { string, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';
import { Heading, Block } from 'sly/components/atoms';
import { ROOMTYPE_OPTIONS, CARETYPE_OPTIONS, MEDICAID_OPTIONS } from 'sly/constants/pricingForm';

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
    height: ${size('element.large')};
    font-size: ${size('text.caption')};
  }
`;

const CareTypesField = StyledField.extend`
  grid-template-columns: repeat(auto-fit, ${size('layout.col3')});
`;

const CommunityPWEstimatedPricingForm = ({
  error, handleSubmit, onRoomTypeChange, onCareTypeChange,
}) => (
  <form onSubmit={handleSubmit}>
    <HeadingSection level="subtitle" size="subtitle">Get your custom pricing with Sagebrook Senior Living</HeadingSection>
    <StyledBlock size="caption">What type of room are you looking for?</StyledBlock>
    <StyledField
      options={ROOMTYPE_OPTIONS}
      name="roomType"
      type="boxChoice"
      component={ReduxField}
      onChange={onRoomTypeChange}
      multiChoice
    />
    <StyledBlock size="caption">What type of care needs do you have?</StyledBlock>
    <CareTypesField
      options={CARETYPE_OPTIONS}
      name="careType"
      type="boxChoice"
      component={ReduxField}
      onChange={onCareTypeChange}
      multiChoice
    />
    <StyledBlock size="caption">
      Do you qualify for medicaid?
    </StyledBlock>
    <StyledField
      options={MEDICAID_OPTIONS}
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
  onRoomTypeChange: func,
  onCareTypeChange: func,
};

export default CommunityPWEstimatedPricingForm;
