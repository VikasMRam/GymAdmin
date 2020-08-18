import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { SERVICES_OPTIONS } from 'sly/web/constants/wizards/assessment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assessment/Template';
import { Block, Heading, Box } from 'sly/web/components/atoms';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const Services = ({
  handleSubmit, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={10} currentStep={5} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Please tell us if you are interested in these other services</PaddedHeading>
        <PaddedBlock>Please select all that apply.</PaddedBlock>
        <form onSubmit={handleSubmit}>
          <Field
            name="services"
            type="boxChoice"
            component={ReduxField}
            singleChoice
            options={SERVICES_OPTIONS}
            required
          />
          <Footer invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
      <StyledTipBox heading="WHY THIS IS IMPORTANT:">
        Families just like you use these services often. We will connect you directly with the service providers you are interested in.
      </StyledTipBox>
      }
    </Wrapper>
  </div>
);

Services.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Services.defaultProps = {
  hasTip: true,
};

export default Services;
