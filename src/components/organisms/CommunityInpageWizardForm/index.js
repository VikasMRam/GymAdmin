import React from 'react';
import { string, func, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { ROOMTYPE_OPTIONS, CARETYPE_OPTIONS, MEDICAID_OPTIONS } from 'sly/constants/pricingForm';
import { Heading, Block } from 'sly/components/atoms';
import HelpBubble from 'sly/components/molecules/HelpBubble';

const HeadingSection = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
  display: flex;
`;

const StyledField = styled(Field)`
  display: grid;
  grid-gap: ${size('spacing.large')};
  grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  margin-right: -${size('spacing.regular')};
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

const StyledHelpBubble = styled(HelpBubble)`
  margin-left: ${size('spacing.small')};
`;

const CommunityInpageWizardForm = ({ error, handleSubmit, communityName, onRoomTypeChange, onCareTypeChange, userDetails }) => (
  <form name="CommunityPWEstimatedPricingForm" onSubmit={handleSubmit}>
    <HeadingSection level="subtitle" size="subtitle">Get your Pricing and Availability for {communityName}</HeadingSection>
    <StyledBlock size="caption">
      What type of room are you looking for?
      <StyledHelpBubble>All shown room types may not be available in this community.</StyledHelpBubble>
    </StyledBlock>
    <StyledField
      options={ROOMTYPE_OPTIONS}
      name="roomType"
      type="boxChoice"
      component={ReduxField}
      onChange={onRoomTypeChange}
      multiChoice
    />
    <StyledBlock size="caption">
      What care needs do you or your loved one have?
      <StyledHelpBubble>
        A Physician&apos;s report and an in-person assessment at the community will help determine your particular care<br />
        needs and may vary from what is displayed below.
      </StyledHelpBubble>
    </StyledBlock>
    <CareTypesField
      options={CARETYPE_OPTIONS}
      name="careType"
      type="boxChoice"
      component={ReduxField}
      onChange={onCareTypeChange}
      multiChoice
    />
    {!(userDetails && userDetails.medicaidCoverage) &&
    <>
      <StyledBlock size="caption">
        Do you qualify for Medicaid?
        <StyledHelpBubble>
          Typically, Medicare and Medicaid cannot be used for monthly rent in long-term care communities.<br />
          However, veteran&apos;s benefits and long term care insurance can help bridge the cost.
        </StyledHelpBubble>
      </StyledBlock>
      <StyledField
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

CommunityInpageWizardForm.propTypes = {
  error: string,
  handleSubmit: func,
  communityName: string,
  onRoomTypeChange: func,
  onCareTypeChange: func,
  userDetails: object,
};

export default CommunityInpageWizardForm;
