import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { WHO_PERSON_OPTIONS } from 'sly/web/constants/wizards/assesment';
import pad from 'sly/web/components/helpers/pad';
import { Wrapper, Footer } from 'sly/web/components/wizards/assesment/Template';
import { Heading, Box } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import TipBox from 'sly/web/components/molecules/TipBox';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const PaddedIconItem = pad(IconItem, 'large');

const StyledTipBox = styled(TipBox)`
  height: fit-content;
`;

const Who = ({
  handleSubmit, invalid, submitting, hasTip,
}) => (
  <div>
    <Wrapper>
      <PaddedProgressBar label totalSteps={8} />
    </Wrapper>
    <Wrapper hasSecondColumn={hasTip}>
      <Box>
        <PaddedHeading level="subtitle" weight="medium">Who are you looking for?</PaddedHeading>
        <form onSubmit={handleSubmit}>
          <Field
            name="lookingFor"
            type="select"
            component={ReduxField}
            required
          >
            <option>Select a person</option>
            {WHO_PERSON_OPTIONS.map(o => <option value={o.value} key={o.value}>{o.label}</option>)}
          </Field>
          <Footer invalid={invalid} submitting={submitting} />
        </form>
      </Box>
      {hasTip &&
        <StyledTipBox heading="WHY THIS IS IMPORTANT:">
          <PaddedIconItem icon="favourite-light" iconPalette="slate" iconVariation="base">Getting to know you helps us personalize how we assist you.</PaddedIconItem>
          <IconItem icon="lock" iconPalette="slate" iconVariation="base">Any information you share with us is private and secure.</IconItem>
        </StyledTipBox>
      }
    </Wrapper>
  </div>
);

Who.propTypes = {
  handleSubmit: func.isRequired,
  invalid: bool,
  submitting: bool,
  hasTip: bool,
};

Who.defaultProps = {
  hasTip: true,
};

export default Who;
