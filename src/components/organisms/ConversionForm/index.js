import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  margin-bottom: ${size('spacing.regular')};
`;

const ConversionForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="full_name" label="Full Name" component={ReduxField} />
    <Field
      name="email"
      label="Email"
      type="email"
      placeholder="jdoe@gmail.com"
      component={ReduxField}
    />
    <Field
      name="phone"
      label="Phone"
      placeholder="925-555-5555"
      component={ReduxField}
    />
    <StyledButton type="submit" disabled={submitting}>
      Contact
    </StyledButton>
    <Block size="caption">
      By continuing, you agree to Seniorly's Terms of Use and Privacy Policy
    </Block>
  </Form>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default ConversionForm;

