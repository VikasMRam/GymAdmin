import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { FEELING_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Feeling = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">
        How are you feeling about finding a senior living community?
      </Heading>
      <form onSubmit={handleSubmit}>
        <Field
          options={FEELING_OPTIONS}
          name="feeling"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        We&apos;ve been through this with thousands of loved ones. You&apos;re in good hands!
      </TipBox>
    }
  </Wrapper>
);

Feeling.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Feeling.defaultProps = {
  hasTip: true,
};

export default Feeling;
