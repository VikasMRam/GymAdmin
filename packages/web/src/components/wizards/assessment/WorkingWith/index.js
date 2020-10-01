import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { WORKING_WITH_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const WorkingWith = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="large">Do any of these apply to you?</Heading>
      <Block pad="large">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          multiChoice
          options={WORKING_WITH_OPTIONS}
          name="workingWith"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
        This will help our team better understand and support you wherever you are in your search.
      </TipBox>
    }
  </Wrapper>
);

WorkingWith.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

WorkingWith.defaultProps = {
  hasTip: true,
};

export default WorkingWith;
