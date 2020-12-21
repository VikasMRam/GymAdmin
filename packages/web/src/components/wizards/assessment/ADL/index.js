import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';

import { ADL_OPTIONS, COEXISTING_ADL_OPTIONS } from 'sly/web/constants/wizards/assessment';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Block } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const generateHeading = (whoNeedsHelp) => {
  switch (whoNeedsHelp) {
    case 'parents':
      return 'Which activities does your parent(s) need help with?';
    case 'myself-and-spouse':
      return 'Which activities do you and your spouse need help with?';
    case 'myself':
      return 'Which activities do you need help with?';
    case 'spouse':
      return 'Which activities does your spouse need help with?';
    case 'other-relatives':
      return 'Which activities does your relative need help with?';
    case 'friend':
      return 'Which activities does your friend(s) need help with?';
    default:
      return 'Which activities below does the person you are looking for need help with?';
  }
};

const ADL = ({
  handleSubmit, onBackClick, onSkipClick, whoNeedsHelp, invalid, submitting, hasTip, change,
}) => {
  let opts = ADL_OPTIONS;
  if (whoNeedsHelp && whoNeedsHelp.match(/myself/)) {
    opts = opts.filter(e => !e.value.match(/memory-care/));
    onSkipClick(); // Skip step and move ahead. ?
  }

  return (
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <Heading level="subtitle" weight="medium" pad="large">{generateHeading(whoNeedsHelp)}</Heading>
        <Block pad="xLarge">Please select all that apply.</Block>
        <form onSubmit={handleSubmit}>
          <Field
            multiChoice
            options={opts}
            name="adl"
            type="boxChoice"
            align="left"
            component={ReduxField}
            onChange={(event, newValue, previousValue, name) => {
              // we know that last element is the newly added value
              const newlyAddedValue = newValue[newValue.length - 1];
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
        <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
          Knowing more about you will help us narrow down our recommendations to only those communities that can support your care needs.
        </TipBox>
      }
    </Wrapper>
  );
};

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
