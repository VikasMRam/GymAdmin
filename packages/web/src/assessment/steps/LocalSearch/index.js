import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { LIVE_SEARCH_STATE } from 'sly/web/assessment/constants';
import { Wrapper, Footer } from 'sly/web/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const LocalSearch = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">Do you live in the state you’re searching in?</Heading>
      <form onSubmit={handleSubmit}>
        <Field
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
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Our team can help schedule in-person and virtual tours (if offered by the community).
      </TipBox>
    }
  </Wrapper>
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
