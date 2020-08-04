import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { ADL_OPTIONS, COEXISTING_ADL_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { getLabelForWhoPersonOption } from 'sly/web/components/wizards/assessment/helpers';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

const StyledField = styled(Field)`
  > * {
    margin-bottom: ${size('spacing.large')};
  }
`;

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Which activities do your parents need help with?';
    case 'myself-and-spouse':
      return 'Which activities do you and your spouse need help with?';
    case 'myself':
      return 'Which activities do you need help with?';
    default:
      return `Which activities below does your ${getLabelForWhoPersonOption(whoNeedsHelp)} need help with?`;
  }
};

const ADL = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip, change,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} currentStep={3} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp)}</PaddedHeading>
        <PaddedBlock>Please select all that apply.</PaddedBlock>
        <form onSubmit={handleSubmit}>
          <StyledField
            multiChoice
            options={ADL_OPTIONS}
            name="adl"
            type="boxChoice"
            align="left"
            component={ReduxField}
            onChange={(event, newValue, previousValue, name) => {
              // we know that last element is the newly added value
              let newlyAddedValue = newValue[newValue.length - 1];
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
      </Box>
      {hasTip &&
        <StyledTipBox heading="WHY THIS IS IMPORTANT:">
          This helps us narrow down our recommendations to only those communities that can support your care needs.
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

ADL.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  change: func.isRequired,
};

ADL.defaultProps = {
  hasTip: true,
};

export default ADL;
