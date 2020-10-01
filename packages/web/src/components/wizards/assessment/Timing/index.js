import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { TIMING_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Timing = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <Heading level="subtitle" weight="medium" padding="large">Where are you in your senior living search?</Heading>
        <form onSubmit={handleSubmit}>
          <Field
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
        <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
          This will help us understand and support you wherever you are in your search.
        </TipBox>
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
