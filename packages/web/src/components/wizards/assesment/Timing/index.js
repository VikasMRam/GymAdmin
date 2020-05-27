import React from 'react';
import { func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { TIMING_OPTIONS } from 'sly/web/constants/wizards/assesment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assesment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
`;

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const Timing = ({
  handleSubmit, onBackClick, onSkipClick,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={5} />
    </Wrapper>
    <Wrapper>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Please tell us about where you are in your search.</PaddedHeading>
        <PaddedBlock>Select all that apply.</PaddedBlock>
        <form onSubmit={handleSubmit}>
          <StyledField
            multiChoice
            options={TIMING_OPTIONS}
            name="timing"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} />
        </form>
      </Box>
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        This will help us understand and support you wherever you are in your search.
      </StyledTipBox>
    </Wrapper>
  </div>
);

Timing.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
};

export default Timing;
