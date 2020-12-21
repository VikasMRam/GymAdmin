import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { LOCAL_EXPERT_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const LocalExpert = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">
        Are you interested in working with a Seniorly Local Advisors? They can help you find senior living options that fit your budget and care needs.
      </Heading>
      <form onSubmit={handleSubmit}>
        <Field
          options={LOCAL_EXPERT_OPTIONS}
          name="localExpert"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer submitButtonText="Next"  onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Working with one of our Local Experts is a free service for you. They are compensated by the senior living community you choose only when you move-in.
      </TipBox>
    }
  </Wrapper>
);

LocalExpert.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

LocalExpert.defaultProps = {
  hasTip: true,
};

export default LocalExpert;
