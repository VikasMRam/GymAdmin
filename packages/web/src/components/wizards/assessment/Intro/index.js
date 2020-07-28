import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import pad from 'sly/web/components/helpers/pad';
import { Wrapper } from 'sly/web/components/wizards/assessment/Template';
import { Heading, Box, Icon } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledForm = textAlign(styled.form``);
StyledForm.displayName = 'StyledForm';

const PaddedHeading = pad(Heading);
PaddedHeading.displayName = 'PaddedHeading';

const StyledIcon = textAlign(pad(Icon));
StyledIcon.displayName = 'StyledIcon';

const StyledField = styled(Field)`
  &:last-child {
    margin-bottom: 0;
  }
`;

const Intro = ({
  handleSubmit, showSkipOption,
}) => (
  <Wrapper>
    <Box>
      <StyledForm onSubmit={handleSubmit}>
        <StyledIcon icon="logo" palette="primary" size="superHero" />
        <PaddedHeading level="subtitle" weight="medium">Complete this 3-minute assessment tool to get personalized senior living and care options.</PaddedHeading>
        <StyledField
          name="whatToDoNext"
          type="button"
          buttonType="submit"
          component={ReduxField}
          inputValue="start"
        >
          Start
        </StyledField>
        {showSkipOption &&
          <StyledField
            name="whatToDoNext"
            type="button"
            buttonType="submit"
            component={ReduxField}
            inputValue="no-thanks"
            ghost
          >
            No thanks, I just want pricing
          </StyledField>
        }
      </StyledForm>
    </Box>
  </Wrapper>
);

Intro.propTypes = {
  handleSubmit: func.isRequired,
  showSkipOption: bool,
};

export default Intro;
