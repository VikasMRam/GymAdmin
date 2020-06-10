import React from 'react';
import { func, string, number, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { BUDGET_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const PaddedIconItem = pad(IconItem, 'large');

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
`;

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const generateHeading = (whoNeedsHelp, amount, city, state) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Do your parents have access to any of these benefits?`;
    case 'myself-and-spouse':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Do you and your spouse have access to any of these benefits?`;
    case 'myself':
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Do you have access to any of these benefits?`;
    default:
      return `The average monthly cost of senior living in ${city}, ${state} is ${formatMoney(amount)}. Does your ${whoNeedsHelp} have access to any of these benefits?`;
  }
};

const Budget = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, amount, city, state, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={7} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp, amount, city, state)}</PaddedHeading>
        <PaddedBlock>Select all that apply.</PaddedBlock>
        <form onSubmit={handleSubmit}>
          <StyledField
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
        <StyledTipBox heading="DID YOU KNOW?">
          <PaddedIconItem icon="favourite-light" iconPalette="slate" iconVariation="base">Senior living communities typically include an apartment or room, care and/or supervision, and 3-meals per day.</PaddedIconItem>
          <IconItem icon="payment" iconPalette="slate" iconVariation="base">Although senior living is usually paid out of pocket, we are here to help you understand all of your options.</IconItem>
        </StyledTipBox>
      }
    </Wrapper>
  </div>
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
