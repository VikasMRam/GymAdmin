import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import fullWidth from 'sly/components/helpers/fullWidth';
import { Heading, Button, Block } from 'sly/components/atoms';
import ReduxField from 'sly/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import userPropType from 'sly/propTypes/user';

const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);

const TopSection = styled.div`;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CommunityAskQuestionAgentForm = ({
  heading, description, handleSubmit, pristine, submitting, error, placeholder, user,
}) => (
  <form onSubmit={handleSubmit} name="CommunityAskQuestionAgentForm">
    <TopSection>
      <Heading level="subtitle" size="subtitle">{heading}</Heading>
      {description && <Block>{description}</Block>}
    </TopSection>
    {!(user && user.name) && <Field
      name="full_name"
      label="Full name"
      type="text"
      placeholder="Full name"
      component={ReduxField}
    />}
    {!(user && user.phoneNumber) &&
      <Field
        name="phone"
        label="Phone"
        type="text"
        placeholder="925-555-5555"
        component={ReduxField}
      />
    }
    <StyledField
      name="question"
      label="Your message"
      type="textarea"
      rows="5"
      placeholder={placeholder}
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
    <StyledButton type="submit" kind="jumbo" disabled={pristine || submitting}>
      Send
    </StyledButton>
    <TosAndPrivacy />
  </form>

);

CommunityAskQuestionAgentForm.propTypes = {
  handleSubmit: func,
  pristine: bool,
  submitting: bool,
  error: string,
  placeholder: string.isRequired,
  heading: string.isRequired,
  description: string,
  user: userPropType,
};

export default CommunityAskQuestionAgentForm;
