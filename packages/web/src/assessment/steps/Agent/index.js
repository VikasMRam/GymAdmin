import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { AGENT_OPTIONS } from 'sly/web/assessment/constants';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/assessment/Template';
import { Heading } from 'sly/web/components/atoms';
// import IconItem from 'sly/web/components/molecules/IconItem';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Agent = ({
  handleSubmit, invalid, submitting, hasTip, onSkipClick, onBackClick,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>
      <Heading level="subtitle" weight="medium" pad="xLarge">Would you like to be connected to a local advisor? It is a free service.</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="agent"
          type="boxChoice"
          component={ReduxField}
          required
          options={AGENT_OPTIONS}
        />
        <Footer invalid={invalid} submitting={submitting} onSkipClick={onSkipClick} onBackClick={onBackClick} />
      </form>
    </Wrapper>
    {hasTip &&
    <TipBoxWrapper>
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Seniorly local advisors know all the communities in your area and can share costs, availability, features, and so much more at no cost to you.
      </TipBox>
    </TipBoxWrapper>
    }
  </PageWrapper>
);

Agent.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  onSkipClick: func,
  onBackClick: func,
};

Agent.defaultProps = {
  hasTip: true,
};

export default Agent;
