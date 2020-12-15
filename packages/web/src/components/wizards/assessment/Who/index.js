import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { WHO_PERSON_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Who = ({
  handleSubmit, invalid, submitting, hasTip, onSkipClick, onBackClick,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">Who are you looking for?</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="lookingFor"
          type="select"
          component={ReduxField}
          required
        >
          <option value="">Select a person</option>
          {WHO_PERSON_OPTIONS.map(o => <option value={o.value} key={o.value}>{o.label}</option>)}
        </Field>
        <Footer invalid={invalid} submitting={submitting} onSkipClick={onSkipClick} onBackClick={onBackClick} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Thousands of families trust and use Seniorly every year. We work hard to make sure you find the right senior living and care options.
      </TipBox>
    }
  </Wrapper>
);

Who.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  onSkipClick: func,
  onBackClick: func,
};

Who.defaultProps = {
  hasTip: true,
};

export default Who;
