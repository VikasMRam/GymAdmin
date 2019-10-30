import React from 'react';
import { func, string, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Heading, Button } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import { EXIT_INTENT_TYPE } from 'sly/constants/retentionPopup';
import textAlign from 'sly/components/helpers/textAlign';


const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);
StyledButton.displayName = 'StyledButton';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const ExitIntentHeading = textAlign(StyledHeading);
ExitIntentHeading.displayName = 'ExitIntentHeading';

const CommunityAskQuestionForm = ({
  handleSubmit, submitting, communityName, user, error, type,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        type === EXIT_INTENT_TYPE ?
          (
            <>
              <ExitIntentHeading level="title" size="subtitle">Wait! Get support from a local senior living expert. This is a free service.</ExitIntentHeading>
              <Field
                name="question"
                label="Your question"
                type="textarea"
                component={ReduxField}
              />
              <Field
                name="name"
                label="Full name"
                type="text"
                component={ReduxField}
              />
              <Field
                name="email"
                label="Email"
                type="text"
                component={ReduxField}
              />
            </>) :
          (<>
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
          </>)

      }

      {error && <strong>{error}</strong>}
      <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        {type === EXIT_INTENT_TYPE ? 'Get Free Support' : 'Submit Question'}
      </StyledButton>

      {<TosAndPrivacy />}
    </form>

  );
};

CommunityAskQuestionForm.propTypes = {
  handleSubmit: func.isRequired,
  communityName: string.isRequired,
  submitting: bool,
  user: object,
  error: string,
  type: string,
};

export default CommunityAskQuestionForm;
