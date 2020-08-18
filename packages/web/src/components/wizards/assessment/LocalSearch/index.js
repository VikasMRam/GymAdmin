import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { LIVE_SEARCH_STATE } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

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

const LocalSearch = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={7} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Do you live in the state you’re searching in?</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            options={LIVE_SEARCH_STATE}
            name="localSearch"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="DID YOU KNOW?">
          Our team can help schedule in-person and virtual tours (if offered by the community).
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

LocalSearch.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

LocalSearch.defaultProps = {
  hasTip: true,
};

export default LocalSearch;
