import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { DEMENTIA_FORGETFUL_OPTIONS, DEMENTIA_FORGETFUL_DEFAULT_OPTIONS } from 'sly/web/constants/wizards/assesment';
import pad from 'sly/web/components/helpers/pad';
import { getLabelForWhoPersonOption } from 'sly/web/components/wizards/assesment/helpers';
import { Wrapper, Footer } from 'sly/web/components/wizards/assesment/Template';
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
    case 'parents':
      return 'Are your parents forgetful?';
    case 'myself-and-spouse':
      return 'Are you and your spouse forgetful?';
    case 'myself':
      return 'Are you forgetful?';
    default:
      return `Is your ${getLabelForWhoPersonOption(whoNeedsHelp)} forgetful?`;
  }
};

const Dementia = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={4} />
    </Wrapper>
    <Wrapper hasSidebar>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp)}</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            multiChoice
            options={DEMENTIA_FORGETFUL_OPTIONS[whoNeedsHelp] || DEMENTIA_FORGETFUL_DEFAULT_OPTIONS[whoNeedsHelp]}
            name="forgetful"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        We can help you find communities that offer additional support and specialized care.
      </StyledTipBox>
    </Wrapper>
  </div>
);

Dementia.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
};

export default Dementia;
