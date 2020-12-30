import React from 'react';
import { func, string, number, bool } from 'prop-types';
import { Field } from 'redux-form';

import { BUDGET_OPTIONS, COEXISTING_BUDGET_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { capitalize } from  'sly/web/services/helpers/utils';
import { stateAbbr } from  'sly/web/services/helpers/url';
import { PageWrapper, Wrapper, Footer, TipBoxWrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Block } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp, amount, city, state) => {
  city = city.replace('-', ' ').split(' ').map(s => capitalize(s)).join(' ');
  state = stateAbbr[capitalize(state)];
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Some families have benefits to help cover senior living costs. Does your parent have access to any of these benefits?';
    case 'myself-and-spouse':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Do you and your spouse have access to any of these benefits?`;
    case 'myself':
      return 'Some families have benefits to help cover senior living costs. Do you have access to any of these benefits?';
    case 'spouse':
      return 'Some families have benefits to help cover senior living costs. Does your spouse or partner have access to any of these benefits?';
    case 'friend':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Does your friend(s) have access to any of these benefits?`;
    case 'other-relatives':
      return 'Some families have benefits to help cover senior living costs. Do you have access to any of these benefits?';
    default:
      return 'Some families have benefits to help cover senior living costs. Do you have access to any of these benefits?';
  }
};

const Budget = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, amount, city, state, invalid, submitting, hasTip, change,
}) => (
  <PageWrapper hasSecondColumn={hasTip}>
    <Wrapper>

      <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp, amount, city, state)}</Heading>
      <Block pad="xLarge">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          multiChoice
          options={BUDGET_OPTIONS}
          name="budget"
          type="boxChoice"
          align="left"
          component={ReduxField}
          onChange={(event, newValue, previousValue, name) => {
            // we know that last element is the newly added value
            const newlyAddedValue = newValue[newValue.length - 1];
            const valuesThatCanExist = COEXISTING_BUDGET_OPTIONS[newlyAddedValue];
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
        <Block>Although senior living is usually paid out of pocket, we are here to help you understand all of your options.</Block>
      </TipBox>
    </TipBoxWrapper>
    }
  </PageWrapper>
);

Budget.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  city: string.isRequired,
  state: string.isRequired,
  amount: number.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Budget.defaultProps = {
  hasTip: true,
};

export default Budget;
