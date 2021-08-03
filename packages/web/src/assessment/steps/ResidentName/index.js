import React from 'react';
import { func, number, bool } from 'prop-types';
import { Field } from 'redux-form';

import { Wrapper, Footer, PageWrapper } from 'sly/web/assessment/Template';
import { Heading, Box, Grid } from 'sly/common/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Block } from 'sly/common/system';

const ResidentName = ({
  handleSubmit, onSkipClick, numberOfPeople, invalid, submitting, hasTip,
}) => (
  <PageWrapper>
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
                name={`fullName${numberOfPeople > 1 ? i + 1 : ''}`}
                type="text"
                label="Full Name"
                component={ReduxField}
                pad="xLarge"
              />

            </Grid>
        ))}
          <Footer onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
      <Block marginTop="l">
        <TipBox heading="WHY THIS IS IMPORTANT:" height="fit-content" >
          We help every family as if they are our own.
        </TipBox>
      </Block>
    }
    </Wrapper>
  </PageWrapper>
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
