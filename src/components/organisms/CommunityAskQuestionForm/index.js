import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';

import { Heading, Button } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;


const CommunityAskQuestionForm = ({
  handleSubmit, pristine, submitting, communityName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Heading level="title" size="title">Ask our experts about {communityName}</Heading>
      <Field
        name="question"
        label=""
        type="textarea"
        placeholder="Type your Question here..."
        component={ReduxField}
      />
      <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
        Submit Question
      </StyledButton>

      {/* <TosAndPrivacy /> */}
    </form>
  );
};

CommunityAskQuestionForm.propTypes = {
  handleSubmit: func.isRequired,
  communityName: string.isRequired,
  pristine: bool,
  submitting: bool,
};

export default CommunityAskQuestionForm;
