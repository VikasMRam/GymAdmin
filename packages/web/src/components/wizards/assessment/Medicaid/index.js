import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { MEDICAID_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Does your parent qualify for Medicaid?';
    case 'myself-and-spouse':
      return 'Do you or your spouse qualify for Medicaid?';
    case 'myself':
      return 'Do you qualify for Medicaid?';
    case 'spouse':
      return 'Does your spouse or partner qualify for Medicaid?';
    case 'friend':
      return 'Does your friend(s) qualify for Medicaid?';
    case 'other-relatives':
      return 'Does your relative(s) qualify for Medicaid?';
    default:
      return 'Does the person you are looking for qualify for Medicaid?';
  }
};

const Medicaid = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>

      <Heading level="subtitle" weight="medium" pad="xLarge">{generateHeading(whoNeedsHelp)}</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          options={MEDICAID_OPTIONS}
          name="medicaid"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>

    </Wrapper>
    {hasTip &&
      <TipBoxWrapper>
        <TipBox heading="TYPICAL MEDICAID QUALIFICATIONS:" height="fit-content">
          <Block>Income limit is typically less than $2,360 per month (FBR).</Block>
          <br />
          <Block>
            Asset limit in most states is $1,600 to $15,750.
          </Block>
        </TipBox>
      </TipBoxWrapper>
    }
  </PageWrapper>
);

Medicaid.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Medicaid.defaultProps = {
  hasTip: true,
};

export default Medicaid;
