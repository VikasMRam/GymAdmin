import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { AGE_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';


const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'How old is your parent(s)?';
    case 'myself-and-spouse':
      return 'How old are you and your spouse?';
    case 'myself':
      return 'How old are you?';
    case 'friend':
      return 'How old is your friend?';
    default:
      return 'How old is the person(s) you are searching for?';
  }
};

const Age = ({
               handleSubmit, invalid, submitting, hasTip, whoNeedsHelp
             }) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={4} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">{generateHeading(whoNeedsHelp)}</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <Field
            name="age"
            type="boxChoice"
            component={ReduxField}
            singleChoice
            options={AGE_OPTIONS}
            required
          />
          <Footer invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        Some communities have age restrictions
      </StyledTipBox>
      }
    </Wrapper>
  </div>
);

Age.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Age.defaultProps = {
  hasTip: true,
};

export default Age;
