import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Location = ({
  handleSubmit, invalid, submitting, hasTip,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>
      <Heading pad="xLarge" level="subtitle" weight="medium">Where are you looking for senior living options?</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="location"
          type="locationSearch"
          component={ReduxField}
          required
        />
        <Footer invalid={invalid} submitting={submitting} />
      </form>
    </Wrapper>
    {hasTip &&
    <TipBoxWrapper>
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Our platform has a network of over 40,000 of the best senior living communities and hundreds of agents across the US.
      </TipBox>
    </TipBoxWrapper>
    }
  </PageWrapper>
);

Location.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Location.defaultProps = {
  hasTip: true,
};

export default Location;
