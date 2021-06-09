import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { CURRENT_LIVING_OPTIONS, CURRENT_LIVING_DEFAULT_OPTIONS } from 'sly/web/assessment/constants';
import { getLabelForWhoPersonOption } from 'sly/web/assessment/helpers';
import { Wrapper, Footer } from 'sly/web/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'myself-and-spouse':
      return "Please tell us about you and your spouse's current living situation.";
    case 'myself':
      return 'Please tell us about your current living situation';
    default:
      return `Please tell us about your ${getLabelForWhoPersonOption(whoNeedsHelp)}'s current living situation.`;
  }
};

const CurrentLiving = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">{generateHeading(whoNeedsHelp)}</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          options={CURRENT_LIVING_OPTIONS[whoNeedsHelp] || CURRENT_LIVING_DEFAULT_OPTIONS}
          name="currentLiving"
          type="boxChoice"
          align="left"
          component={ReduxField}
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="DID YOU KNOW?" height="fit-content">
        If you are in an urgent situation, we know how best to accommodate your needs.
      </TipBox>
    }
  </Wrapper>
);

CurrentLiving.propTypes = {
  handleSubmit: func.isRequired,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

CurrentLiving.defaultProps = {
  hasTip: true,
};

export default CurrentLiving;
