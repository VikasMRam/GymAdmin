import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { DEMENTIA_FORGETFUL_OPTIONS, DEMENTIA_FORGETFUL_DEFAULT_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { getLabelForWhoPersonOption } from 'sly/web/components/wizards/assessment/helpers';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Are your parents forgetful?';
    case 'myself-and-spouse':
      return 'Are you and your spouse forgetful?';
    case 'myself':
      return 'Are you forgetful?';
    default:
      return `Is your ${getLabelForWhoPersonOption(whoNeedsHelp)} forgetful?`;
  }
};

const Dementia = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading>
      <Block pad="xLarge">Please select all that apply.</Block>
      <form onSubmit={handleSubmit}>
        <Field
          multiChoice
          options={DEMENTIA_FORGETFUL_OPTIONS[whoNeedsHelp] || DEMENTIA_FORGETFUL_DEFAULT_OPTIONS[whoNeedsHelp]}
          name="forgetful"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
        We can help you find communities that offer additional support and specialized care.
      </TipBox>
    }
  </Wrapper>
);

Dementia.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Dementia.defaultProps = {
  hasTip: true,
};

export default Dementia;
