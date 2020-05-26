import React from 'react';
import { func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import pad from 'sly/web/components/helpers/pad';
import textAlign from 'sly/web/components/helpers/textAlign';
import { Wrapper } from 'sly/web/components/wizards/assesment/Template';
import { Heading, Box, Icon } from 'sly/web/components/atoms';
import ReduxField from 'sly/web/components/organisms/ReduxField';

const StyledForm = textAlign(styled.form``);
StyledForm.displayName = 'StyledForm';

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const StyledIcon = textAlign(pad(Icon));
StyledIcon.displayName = 'StyledIcon';

const Intro = ({
  handleSubmit,
}) => (
  <Wrapper>
    <Box>
      <StyledForm onSubmit={handleSubmit}>
        <StyledIcon icon="logo" palette="primary" size="xLarge" />
        <PaddedHeading level="subtitle" weight="medium">Complete this 3-minute assessment tool to get personalized senior living and care options.</PaddedHeading>
        <Field
          name="whatToDoNext"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue="start"
        >
          Start
        </Field>
        <Field
          name="whatToDoNext"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue="no-thanks"
          ghost
        >
          No thanks, I just want pricing
        </Field>
      </StyledForm>
    </Box>
  </Wrapper>
);

Intro.propTypes = {
  handleSubmit: func.isRequired,
};

export default Intro;
