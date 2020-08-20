import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { TIMING_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer, TipContentBox } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

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
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={1} />
      {/* <PaddedProgressBar label totalSteps={8} currentStep={5} /> */}
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Where are you in your senior living search?</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            singleChoice
            options={TIMING_OPTIONS}
            name="timing"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="WHY THIS IS IMPORTANT:">
          <TipContentBox>This will help us understand and support you wherever you are in your search.</TipContentBox>
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

Timing.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Timing.defaultProps = {
  hasTip: true,
};

export default Timing;
