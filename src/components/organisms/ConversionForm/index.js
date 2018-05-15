import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block } from 'sly/components/atoms';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';

const Form = styled.form`
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  padding: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const ConversionForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Heading level={'subtitle'}>Yes, connect me to this community...</Heading>
    <Field
      name="full_name"
      label="Full Name"
      placeholder="Jane Doe"
      component={ReduxField}
    />
    <Field
      name="email"
      label="Email"
      type="email"
      placeholder="janedoe@gmail.com"
      component={ReduxField}
    />
    <Field
      name="phone"
      label="Phone"
      placeholder="925-555-5555"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Connect
    </StyledButton>

    <TosAndPrivacy />
  </Form>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default ConversionForm;
