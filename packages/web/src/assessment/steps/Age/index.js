import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { AGE_OPTIONS } from 'sly/web/assessment/constants';
import { Wrapper, Footer } from 'sly/web/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'How old is your parent(s)?';
    case 'myself-and-spouse':
      return 'How old are you and your spouse?';
    case 'myself':
      return 'How old are you?';
    case 'spouse':
      return 'How old is your spouse?';
    case 'friend':
      return 'How old is your friend?';
    case 'other-relatives':
      return 'How old is your relative?';
    default:
      return 'How old is the person(s) you are searching for?';
  }
};

const Age = ({
  handleSubmit, invalid, submitting, hasTip, whoNeedsHelp, onBackClick, onSkipClick,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">{generateHeading(whoNeedsHelp)}</Heading>
      <form onSubmit={handleSubmit}>
        <Field
          name="age"
          type="boxChoice"
          component={ReduxField}
          singleChoice
          align="left"
          options={AGE_OPTIONS}
          required
        />
        <Footer onBackClick={onBackClick} onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
    <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
      Some communities have age restrictions.
    </TipBox>
    }
  </Wrapper>
);

Age.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
  whoNeedsHelp: string.isRequired,
  onSkipClick: func,
  onBackClick: func,
};

Age.defaultProps = {
  hasTip: true,
};

export default Age;
