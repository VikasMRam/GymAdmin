import React from 'react';
import { func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { FEELING_OPTIONS } from 'sly/web/constants/wizards/assesment';
import pad from 'sly/web/components/helpers/pad';
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

const Feeling = ({
  handleSubmit, onBackClick, onSkipClick,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={2} />
    </Wrapper>
    <Wrapper>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">How are you feeling about finding a senior living community?</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            options={FEELING_OPTIONS}
            name="feeling"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} />
        </form>
      </Box>
      <StyledTipBox heading="DID YOU KNOW?">
        We&apos;ve been through this with thousands of loved ones. You&apos;re in good hands!
      </StyledTipBox>
    </Wrapper>
  </div>
);

Feeling.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
};

export default Feeling;
