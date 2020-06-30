import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { MEDICAID_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { getLabelForWhoPersonOption } from 'sly/web/components/wizards/assessment/helpers';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedIconItem = pad(IconItem, 'large');

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
`;

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Do your parents qualify for Medicaid?';
    case 'myself-and-spouse':
      return 'Do you or your spouse qualify for Medicaid?';
    case 'myself':
      return 'Do you qualify for Medicaid?';
    default:
      return `Does your ${getLabelForWhoPersonOption(whoNeedsHelp)} qualify for Medicaid?`;
  }
};

const Medicaid = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={8} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp)}</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <StyledField
            options={MEDICAID_OPTIONS}
            name="medicaid"
            type="boxChoice"
            align="left"
            component={ReduxField}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="YOU TYPICALLY QUALIFY IF:">
          <PaddedIconItem icon="warning" iconPalette="slate" iconVariation="base">Asset limit in most states is $1,600 to $15,750.</PaddedIconItem>
          <IconItem icon="warning" iconPalette="slate" iconVariation="base">Income limit is typically less than $2,360 per month (FBR).</IconItem>
        </StyledTipBox>
      }
    </Wrapper>
  </div>
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
