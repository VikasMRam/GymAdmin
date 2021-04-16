import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { ADL_OPTIONS, COEXISTING_ADL_OPTIONS, EXPERIMENT_ADL_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Does your parent need help with any of the following?';
    case 'myself-and-spouse':
      return 'Which activities do you and your spouse need help with?';
    case 'myself':
      return 'Do you need help with any of the following?';
    case 'spouse':
      return 'Does your spouse or partner need help with any of the following?';
    case 'other-relatives':
      return 'Do you need help with any of the following?';
    case 'friend':
      return 'Which activities does your friend(s) need help with?';
    default:
      return 'Do you need help with any of the following?';
  }
};

const ADL = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip, change, stepName,
}) => {
  let opts = stepName === 'step-2:ADL-New_Steps' ? EXPERIMENT_ADL_OPTIONS : ADL_OPTIONS;
  if (whoNeedsHelp && whoNeedsHelp.match(/myself/)) {
    opts = opts.filter(e => !e.value.match(/memory-care/));
  }

  return (
    <PageWrapper hasSecondColumn={hasTip}>
      <Wrapper>
        <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading>
        <Block pad="xLarge">Please select all that apply.</Block>
        <form onSubmit={handleSubmit}>
          <Field
            options={opts}
            name="adl"
            type="boxChoice"
            align="left"
            multiChoice
            component={ReduxField}
            onChange={(event, newValue, previousValue, name) => {
              // we know that last element is the newly added value
              const newlyAddedValue = newValue[newValue.length - 1];
              const valuesThatCanExist = COEXISTING_ADL_OPTIONS[newlyAddedValue];
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
        <TipBox heading="WHY THIS IS IMPORTANT:">
          Knowing more about you will help us narrow down our recommendations to only those communities that can support your care needs.
        </TipBox>
      </TipBoxWrapper>
      }
    </PageWrapper>
  );
};

ADL.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  experiment: bool,
  change: func.isRequired,
  stepName: string,
};

ADL.defaultProps = {
  hasTip: true,
  experiment: false,
};

export default ADL;
