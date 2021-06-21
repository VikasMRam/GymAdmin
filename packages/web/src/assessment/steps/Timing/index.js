import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { TIMING_OPTIONS } from 'sly/web/assessment/constants';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/assessment/Template';
import { Heading } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Timing = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <div>
    <PageWrapper hasSecondColumn={hasTip}>
      <Wrapper>

        <Heading level="subtitle" weight="medium" pad="xLarge">What’s your timeframe?</Heading>
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

      </Wrapper>
      {hasTip &&
        <TipBoxWrapper>
          <TipBox heading="DID YOU KNOW?" height="fit-content">
            Whether you need to find options immediately or are planning ahead - we got you.
          </TipBox>
        </TipBoxWrapper>
      }
    </PageWrapper>
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