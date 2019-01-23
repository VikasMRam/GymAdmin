import React from 'react';
import { func, bool, object } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { phoneParser, phoneFormatter } from 'sly/services/helpers/phone';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Button, Heading, Box, Hr } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
  font-weight: normal;
`;

const ConversionForm = ({
  handleSubmit,
  submitting,
  hasOnlyEmail,
}) => (
  <Box>
    <form onSubmit={handleSubmit}>
      <Heading level="title" size="subtitle">Get Pricing & Availability</Heading>

      <Hr />

      <Field
        name="full_name"
        label="Full Name"
        placeholder="Full name"
        component={ReduxField}
      />
      {!hasOnlyEmail && (
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          component={ReduxField}
        />
      )}
      <Field
        name="phone"
        label="Phone"
        parse={phoneParser}
        format={phoneFormatter}
        placeholder="Phone"
        component={ReduxField}
      />
      <StyledButton type="submit" kind="jumbo" disabled={submitting}>
        Request Info
      </StyledButton>

      <TosAndPrivacy />
    </form>
  </Box>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  agent: object,
  contact: object,
  hasOnlyEmail: bool,
  onAdvisorHelpClick: func,
};

export default ConversionForm;
