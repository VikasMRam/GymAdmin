import React from 'react';
import { string, func, object, oneOf } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { CARETYPE_OPTIONS, MEDICAID_OPTIONS, MOVETIMELINE_OPTIONS } from 'sly/web/constants/pricingForm';
import { Heading, Block } from 'sly/web/components/atoms';
import HelpBubble from 'sly/web/components/molecules/HelpBubble';

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
  margin-right: -${size('spacing.regular')};
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(auto-fit, calc(${size('layout.col1')} + (${size('layout.gutter')}) * 2));
  }

  > * {
    height: ${size('element.large')};
    font-size: ${size('text.caption')};
  }
`;

const CareTypesField = styled(StyledField)`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    grid-template-columns: repeat(auto-fit, ${size('mobileLayout.col2')});
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(auto-fit, ${size('layout.col3')});
  }
`;

const StyledHelpBubble = styled(HelpBubble)`
  margin-left: ${size('spacing.small')};
`;

const CommunityPWEstimatedPricingForm = ({
  error, handleSubmit, communityName, onMoveTimelineChange, onRoomTypeChange, onCareTypeChange, onHelpHover, uuidAux,
  type,
}) => (
  <form name="CommunityPWEstimatedPricingForm" onSubmit={handleSubmit}>
    <HeadingSection level="subtitle" size="subtitle">
      Our Seniorly Local Advisors will provide you {type} for {communityName}. Please help by answering these three questions:
    </HeadingSection>
    <StyledBlock size="caption">
      What is your timeline to move in?
      {/* <div onMouseEnter={() => onHelpHover('room-type')}> */}
      {/* <StyledHelpBubble>All shown room types may not be available in this community.</StyledHelpBubble> */}
      {/* </div> */}
    </StyledBlock>
    {/* <StyledField */}
    {/* options={ROOMTYPE_OPTIONS} */}
    {/* name="roomType" */}
    {/* type="boxChoice" */}
    {/* padding="regular" */}
    {/* component={ReduxField} */}
    {/* onChange={onRoomTypeChange} */}
    {/* multiChoice */}
    {/* /> */}
    <StyledField
      options={MOVETIMELINE_OPTIONS}
      name="moveTimeline"
      type="boxChoice"
      padding="regular"
      component={ReduxField}
      onChange={onMoveTimelineChange}
    />
    <StyledBlock size="caption">
      What care needs do you or your loved one have?
      <div onMouseEnter={() => onHelpHover('care-needs')}>
        <StyledHelpBubble>
          A Physician&apos;s report and an in-person assessment at the community will help determine your particular care<br />
          needs and may vary from what is displayed below.
        </StyledHelpBubble>
      </div>
    </StyledBlock>
    <CareTypesField
      options={CARETYPE_OPTIONS}
      name="careType"
      type="boxChoice"
      padding="regular"
      hasCheckbox={false}
      component={ReduxField}
      onChange={onCareTypeChange}
      multiChoice
    />
    {!(uuidAux && uuidAux.uuidInfo.financialInfo.medicaid !== undefined) &&
      <>
        <StyledBlock size="caption">
          Do you qualify for Medicaid?
          <div onMouseEnter={() => onHelpHover('medicaid')}>
            <StyledHelpBubble>
              Typically, Medicare and Medicaid cannot be used for monthly rent in long-term care communities.<br />
              However, veteran&apos;s benefits and long term care insurance can help bridge the cost.
            </StyledHelpBubble>
          </div>
        </StyledBlock>
        <StyledField
          options={MEDICAID_OPTIONS}
          name="medicaidCoverage"
          type="boxChoice"
          padding="regular"
          component={ReduxField}
        />
      </>
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
  onHelpHover: func,
  uuidAux: object,
  type: oneOf(['pricing', 'availability']),
};

CommunityPWEstimatedPricingForm.defaultProps = {
  type: 'pricing',
};

export default CommunityPWEstimatedPricingForm;
