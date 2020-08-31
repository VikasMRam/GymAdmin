import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Button } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';

const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);
StyledButton.displayName = 'StyledButton';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityAskQuestionForm = ({
  handleSubmit, submitting, communityName, user, error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <StyledHeading level="subtitle" size="subtitle">Ask our experts about {communityName}</StyledHeading>
      <Field
        name="question"
        label=""
        type="textarea"
        placeholder="Type your Question here..."
        component={ReduxField}
      />
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

      {error && <strong>{error}</strong>}
      <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        Submit Question
      </StyledButton>
      <TosAndPrivacy />
    </form>

  );
};

CommunityAskQuestionForm.propTypes = {
  handleSubmit: func.isRequired,
  communityName: string.isRequired,
  submitting: bool,
  user: object,
  error: string,
};

export default CommunityAskQuestionForm;
