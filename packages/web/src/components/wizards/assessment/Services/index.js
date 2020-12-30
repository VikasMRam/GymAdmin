import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { SERVICES_OPTIONS, COEXISTING_SERVICES_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading } from 'sly/web/components/atoms';
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
  handleSubmit, invalid, submitting, hasTip, whoNeedsHelp,  onSkipClick, onBackClick, change,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>

      <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading>
      <Block pad="xLarge">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          name="services"
          type="boxChoice"
          align="left"
          component={ReduxField}
          multiChoice
          options={SERVICES_OPTIONS}
          required
          onChange={(event, newValue, previousValue, name) => {
            // we know that last element is the newly added value
            const newlyAddedValue = newValue[newValue.length - 1];
            const valuesThatCanExist = COEXISTING_SERVICES_OPTIONS[newlyAddedValue];
            if (valuesThatCanExist) {
              newValue = newValue.filter(v => valuesThatCanExist.includes(v));
            }
            // delay this update to next tick so that it's always applied at last
            setTimeout(() => change(name, newValue));
          }}
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
  change: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  whoNeedsHelp: string,
  onSkipClick: func,
  onBackClick: func,
};

Services.defaultProps = {
  hasTip: true,
};

export default Services;
