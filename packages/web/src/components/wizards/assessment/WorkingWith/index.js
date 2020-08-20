import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { COEXISTING_ADL_OPTIONS, WORKING_WITH_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading, 'large');
PaddedHeading.displayName = 'PaddedHeading';

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

const WorkingWith = ({
  handleSubmit, onBackClick, onSkipClick, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={2} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Do any of these apply to you?</PaddedHeading>
        <PaddedBlock>Please select all that apply.</PaddedBlock>
        <form onSubmit={handleSubmit}>
          <StyledField
            multiChoice
            options={WORKING_WITH_OPTIONS}
            name="workingWith"
            type="boxChoice"
            align="left"
            component={ReduxField}
            // onChange={(event, newValue, previousValue, name) => {
            //   // we know that last element is the newly added value
            //   const newlyAddedValue = newValue[newValue.length - 1];
            //   const valuesThatCanExist = COEXISTING_WW_OPTIONS[newlyAddedValue];
            //   if (valuesThatCanExist) {
            //     newValue = newValue.filter(v => valuesThatCanExist.includes(v));
            //   }
            //   // delay this update to next tick so that it's always applied at last
            //   setTimeout(() => change(name, newValue));
            // }}
          />
          <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="WHY THIS IS IMPORTANT:">
          This will help our team better understand and support you wherever you are in your search.
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

WorkingWith.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

WorkingWith.defaultProps = {
  hasTip: true,
};

export default WorkingWith;
