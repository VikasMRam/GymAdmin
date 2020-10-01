import React from 'react';
import { func, number, bool } from 'prop-types';
import { Field } from 'redux-form';

import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Grid } from 'sly/common/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const ResidentName = ({
  handleSubmit, onSkipClick, numberOfPeople, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <Heading level="subtitle" weight="medium" pad="xLarge">
        {numberOfPeople > 1 ?
          'What are the residents\' names?' :
          'What is the resident\'s name?'}
      </Heading>
      <form onSubmit={handleSubmit}>
        {Array(numberOfPeople).fill().map((_, i) => (
          <Grid gap="regular" key={Symbol(i).toString()}>
            <Field
              name={`firstName${numberOfPeople > 1 ? i + 1 : ''}`}
              type="text"
              label="First Name"
              component={ReduxField}
              pad="xLarge"
            />
            <Field
              name={`lastName${numberOfPeople > 1 ? i + 1 : ''}`}
              type="text"
              label="Last Name"
              component={ReduxField}
              pad="xLarge"
            />
          </Grid>
        ))}
        <Footer onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content">
        We help every family as if they are our own.
      </TipBox>
    }
  </Wrapper>
);

ResidentName.propTypes = {
  handleSubmit: func.isRequired,
  onSkipClick: func,
  numberOfPeople: number.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

ResidentName.defaultProps = {
  numberOfPeople: 1,
  hasTip: true,
};

export default ResidentName;
