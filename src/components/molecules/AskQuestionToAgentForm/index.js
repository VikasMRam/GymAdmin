import React from 'react';
import { string, object, func } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Block, Button, Link } from 'sly/components/atoms';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';

const HeadingSection = styled(Heading)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const AskQuestionToAgentForm = ({
  error, firstName, userDetails, heading, handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <HeadingSection size="title">{heading}</HeadingSection>
      {!(userDetails && userDetails.fullName) && <Field
        name="name"
        label="Name *"
        type="text"
        placeholder="Name"
        component={ReduxField}
      />}
      {!(userDetails && userDetails.email) &&
        <Field
          name="email"
          label="Email *"
          type="email"
          placeholder="Email"
          component={ReduxField}
        />
      }
      {!(userDetails && userDetails.phone) &&
        <Field
          name="phone"
          label="Phone *"
          parse={phoneParser}
          format={phoneFormatter}
          placeholder="Phone"
          component={ReduxField}
        />
      }
      <Field
        name="question"
        label={`What can ${firstName} help you with? *`}
        type="textarea"
        rows="5"
        placeholder="I'm interested in a free consult with a Seniorly Agent."
        component={ReduxField}
      />
      {error && <Block palette="danger">{error}</Block>}
      <StyledButton type="submit" kind="jumbo">Send</StyledButton>
      {!(userDetails && userDetails.fullName) && <Block size="tiny">By continuing, you agree to our <Link href="/tos" target="_blank">Terms of Service</Link> and <Link href="/privacy" target="_blank">Privacy Policy</Link></Block>}
    </form>
  );
};

AskQuestionToAgentForm.propTypes = {
  userDetails: object,
  firstName: string.isRequired,
  error: string,
  handleSubmit: func,
  heading: string.isRequired,
};

export default AskQuestionToAgentForm;
