import React from 'react';
import { func, number, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${size('spacing.regular')}
`;

const PaddedField = pad(Field);
PaddedField.displayName = 'PaddedField';

const ResidentName = ({
  handleSubmit, onSkipClick, numberOfPeople, invalid, submitting, hasTip,
}) => (
  <Wrapper hasSecondColumn={hasTip}>
    <Box>
      <PaddedHeading level="subtitle" weight="medium">
        {numberOfPeople > 1 ?
          'Last question, what are the residents\' names?' :
          'Last question, what is the resident\'s name?'}
      </PaddedHeading>
      <form onSubmit={handleSubmit}>
        {Array(numberOfPeople).fill().map((_, i) => (
          <FieldsWrapper key={Symbol(i).toString()}>
            <PaddedField
              name={`firstName${numberOfPeople > 1 ? i + 1 : ''}`}
              type="text"
              label="First Name"
              component={ReduxField}
            />
            <PaddedField
              name={`lastName${numberOfPeople > 1 ? i + 1 : ''}`}
              type="text"
              label="Last Name"
              component={ReduxField}
            />
          </FieldsWrapper>
        ))}
        <Footer submitButtonText="Finish" onSkipClick={onSkipClick} invalid={invalid} submitting={submitting} />
      </form>
    </Box>
    {hasTip &&
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        We help every family as if they are our own.
      </StyledTipBox>
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
