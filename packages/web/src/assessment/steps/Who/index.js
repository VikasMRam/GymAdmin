import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { WHO_PERSON_OPTIONS } from 'sly/web/assessment/constants';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/assessment/Template';
import { Heading } from 'sly/web/components/atoms';
// import IconItem from 'sly/web/components/molecules/IconItem';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const Who = ({
  handleSubmit, invalid, submitting, hasTip, onSkipClick, onBackClick,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>
      <Heading level="subtitle" weight="medium" pad="xLarge">Are you looking for yourself or someone else?</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="lookingFor"
          type="boxChoice"
          component={ReduxField}
          required
          options={WHO_PERSON_OPTIONS}
        />
        <Footer invalid={invalid} submitting={submitting} onSkipClick={onSkipClick} onBackClick={onBackClick} />
      </form>
    </Wrapper>
    {hasTip &&
    <TipBoxWrapper>
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        Millions of families trust and use Seniorly every year. We work hard to make sure you find the right senior living and care options.
      </TipBox>
    </TipBoxWrapper>
    }
  </PageWrapper>
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
