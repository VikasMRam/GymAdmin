import React from 'react';
import { func, string, number, bool } from 'prop-types';
import { Field } from 'redux-form';

import { BUDGET_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { capitalize } from  'sly/web/services/helpers/utils';
import { stateAbbr } from  'sly/web/services/helpers/url';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp, amount, city, state) => {
  city = city.replace('-', ' ').split(' ').map(s => capitalize(s)).join(' ');
  state = stateAbbr[capitalize(state)];
  switch (whoNeedsHelp) {
    case 'parents':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Do your parents have access to any of these benefits?`;
    case 'myself-and-spouse':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Do you and your spouse have access to any of these benefits?`;
    case 'myself':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Do you have access to any of these benefits?`;
    case 'spouse':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Does your spouse have access to any of these benefits?`;
    case 'friend':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Does your friend(s) have access to any of these benefits?`;
    case 'other-relatives':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Does your relative(s) have access to any of these benefits?`;
    default:
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Some families have benefits to help cover costs. Does the person you are looking for have access to any of these benefits?`;
  }
};

const Budget = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, amount, city, state, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
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
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        <IconItem icon="payment" iconPalette="slate" iconVariation="base">Although senior living is usually paid out of pocket, we are here to help you understand all of your options.</IconItem>
      </TipBox>
    }
  </Wrapper>
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
