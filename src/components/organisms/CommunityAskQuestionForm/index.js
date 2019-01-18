import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Heading, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);
StyledButton.displayName = 'StyledButton';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityAskQuestionForm = ({
  handleSubmit, pristine, submitting, communityName, user, error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledHeading level="subtitle" size="subtitle">Ask our experts about {communityName}</StyledHeading>
      {!user && <Field
        name="name"
        label=""
        type="text"
        placeholder="Type your Name here..."
        component={ReduxField}
      />}
      {!user && <Field
        name="email"
        label=""
        type="text"
        placeholder="Type your Email here..."
        component={ReduxField}
      />}
      <Field
        name="question"
        label=""
        type="textarea"
        placeholder="Type your Question here..."
        component={ReduxField}
      />
      {error && <strong>{error}</strong>}
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
  user: object,
  error: string,
};

export default CommunityAskQuestionForm;
