import React from 'react';
import { func, string, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import userPropType from 'sly/common/propTypes/user';

const StyledButton = fullWidth(styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`);

const TopSection = styled.div`;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const FieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: ${size('spacing.regular')};
`;

const CommunityAskQuestionAgentForm = ({
  heading, description, handleSubmit, pristine, submitting, error, placeholder, user,
}) => (
  <form onSubmit={handleSubmit} name="CommunityAskQuestionAgentForm">
    <TopSection>
      <Heading level="subtitle" size="subtitle">{heading}</Heading>
      {description && <Block>{description}</Block>}
    </TopSection>
    {!(user && user.name) &&
    <FieldsWrapper>
      <Field
        name="firstName"
        label="First Name"
        type="text"
        component={ReduxField}
      />
      <Field
        name="lastName"
        label="Last Name"
        type="text"
        component={ReduxField}
      />
    </FieldsWrapper>
    }
    {}

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
