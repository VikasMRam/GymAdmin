import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { SERVICES_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Services = ({
  handleSubmit, invalid, submitting, hasTip, onSkipClick, onBackClick,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">Please tell us if you are interested in these other services:</Heading>
      <Block pad="large">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          name="services"
          type="boxChoice"
          align="left"
          component={ReduxField}
          multiChoice
          options={SERVICES_OPTIONS}
          required
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
        Families just like you use these services often. We will connect you directly with the service providers you are interested in.
      </TipBox>
    }
  </Wrapper>
);

Services.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  onSkipClick: func,
  onBackClick: func,
};

Services.defaultProps = {
  hasTip: true,
};

export default Services;
