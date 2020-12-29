import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';

import { SERVICES_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Would your parent be interested in any of these other services?';
    case 'myself-and-spouse':
      return 'Do you or your spouse qualify for Medicaid?';
    case 'myself':
      return 'Would you be interested in any of these other services?';
    case 'spouse':
      return 'Would your spouse or partner be interested in any of these other services?';
    case 'friend':
      return 'Does your friend(s) qualify for Medicaid?';
    case 'other-relatives':
      return 'Does your relative(s) qualify for Medicaid?';
    default:
      return 'Would you be interested in any of these other services?';
  }
};
const Services = ({
  handleSubmit, invalid, submitting, hasTip, whoNeedsHelp,  onSkipClick, onBackClick,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>

      <Heading level="subtitle" weight="medium" pad="xLarge">{generateHeading(whoNeedsHelp)}</Heading>
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

    </Wrapper>
    {hasTip &&
    <TipBoxWrapper>
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        We&lsquo;ve partnered with some great companies to help with your transition.
      </TipBox>
    </TipBoxWrapper>
    }
  </PageWrapper>
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
