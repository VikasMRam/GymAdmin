import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { CURRENT_LIVING_OPTIONS, CURRENT_LIVING_DEFAULT_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { getLabelForWhoPersonOption } from 'sly/web/components/wizards/assessment/helpers';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
`;

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'myself-and-spouse':
      return "Please tell us about you and your spouse's current living situation.";
    case 'myself':
      return 'Please tell us about your current living situation';
    default:
      return `Please tell us about your ${getLabelForWhoPersonOption(whoNeedsHelp)}'s current living situation.`;
  }
};

const CurrentLiving = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={6} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp)}</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            options={CURRENT_LIVING_OPTIONS[whoNeedsHelp] || CURRENT_LIVING_DEFAULT_OPTIONS}
            name="currentLiving"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="DID YOU KNOW?">
          If you are in an urgent situation, we know how best to accommodate your needs.
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

CurrentLiving.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

CurrentLiving.defaultProps = {
  hasTip: true,
};

export default CurrentLiving;
