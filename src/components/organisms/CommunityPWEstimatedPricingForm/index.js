import React, { Fragment } from 'react';
import { string, func, object } from 'prop-types';
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
  grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(auto-fit, calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2));
  }

  > * {
    height: ${size('element.large')};
    font-size: ${size('text.caption')};
  }
`;

const CareTypesField = StyledField.extend`
  grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(auto-fit, ${size('layout.col3')});
  }
`;

const CommunityPWEstimatedPricingForm = ({
  error, handleSubmit, communityName, onRoomTypeChange, onCareTypeChange, userDetails,
}) => (
  <form onSubmit={handleSubmit}>
    <HeadingSection level="subtitle" size="subtitle">Get your custom pricing for {communityName}</HeadingSection>
    <StyledBlock size="caption">What type of room are you looking for?</StyledBlock>
    <StyledField
      options={ROOMTYPE_OPTIONS}
      name="roomType"
      type="boxChoice"
      component={ReduxField}
      onChange={onRoomTypeChange}
      multiChoice
    />
    <StyledBlock size="caption">What care needs do you or your loved one have?</StyledBlock>
    <CareTypesField
      options={CARETYPE_OPTIONS}
      name="careType"
      type="boxChoice"
      component={ReduxField}
      onChange={onCareTypeChange}
      multiChoice
    />
    {!(userDetails && userDetails.medicaidCoverage) &&
      <Fragment>
        <StyledBlock size="caption">
          Do you qualify for Medicaid?
        </StyledBlock>
        <StyledField
          options={MEDICAID_OPTIONS}
          name="medicaidCoverage"
          type="boxChoice"
          component={ReduxField}
        />
      </Fragment>
    }
    {error && <Block palette="danger">{error}</Block>}
  </form>
);

CommunityPWEstimatedPricingForm.propTypes = {
  error: string,
  handleSubmit: func,
  communityName: string,
  onRoomTypeChange: func,
  onCareTypeChange: func,
  userDetails: object,
};

export default CommunityPWEstimatedPricingForm;
