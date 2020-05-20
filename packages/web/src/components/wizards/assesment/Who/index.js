import React from 'react';
import { func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { WHO_PERSON_OPTIONS } from 'sly/web/constants/wizards/assesment';
import pad from 'sly/web/components/helpers/pad';
import { Heading, Box, Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';

const PaddedProgressBar = pad(ProgressBar);

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const ButtonWrapper = styled.div`
  display:flex;
  justify-content: flex-end;
`;

const Who = ({
  handleSubmit,
}) => (
  <div>
    <PaddedProgressBar label totalSteps={8} />
    <Box>
      <PaddedHeading level="subtitle" weight="medium">Who are you looking for?</PaddedHeading>
      <form onSubmit={handleSubmit}>
        <Field
          name="person"
          type="select"
          component={ReduxField}
          required
        >
          <option>Select a person</option>
          {WHO_PERSON_OPTIONS.map(o => <option value={o.value}>{o.label}</option>)}
        </Field>
        <ButtonWrapper>
          <Button type="submit">Continue</Button>
        </ButtonWrapper>
      </form>
    </Box>
  </div>
);

Who.propTypes = {
  handleSubmit: func.isRequired,
};

export default Who;
