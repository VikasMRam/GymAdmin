import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField/index';

import { Heading, Button } from 'sly/components/atoms';

const QuestionTextDiv = styled.div`
  margin-top: ${size('spacing.large')};
`;

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const CommunityLeaveAnAnswerForm = ({
  handleSubmit, pristine, submitting, questionText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Heading level="title" size="title">Provide an Answer</Heading>
      <QuestionTextDiv>{questionText}</QuestionTextDiv>
      <Field
        name="answer"
        label=""
        type="textarea"
        placeholder="Enter your answer here..."
        component={ReduxField}
      />
      <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
        Submit Answer
      </StyledButton>

      {/* <TosAndPrivacy /> */}
    </form>
  );
};

CommunityLeaveAnAnswerForm.propTypes = {
  handleSubmit: func.isRequired,
  questionText: string.isRequired,
  pristine: bool,
  submitting: bool,
};

export default CommunityLeaveAnAnswerForm;