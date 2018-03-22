import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import ReduxField from 'sly/components/organisms/ReduxField';
import Heading from 'sly/components/atoms/Heading';
import Button from 'sly/components/atoms/Button';
import Block from 'sly/components/atoms/Block';

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`;

const ConversionForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Field name="full_name" label="Full Name" component={ReduxField} />
      <Field
        name="email"
        label="Email"
        type="email"
        component={ReduxField}
      />
      <Field name="phone" label="Phone" component={ReduxField} />
      <Button type="submit" disabled={submitting}>
        Contact
      </Button>
      <Block size="caption">
        By continuing, you agree to Seniorly's Terms of Use and Privacy
        Policy
      </Block>
    </div>
  </Form>
);

ConversionForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
};

export default ConversionForm;
