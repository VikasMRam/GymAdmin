import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Form } from 'sly/common/components/atoms';
import { Button, Block, Grid } from 'sly/common/system';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const ContactUsForm = ({
  handleSubmit, submitting, invalid, error, submitButtonText,
}) => (
  <Form onSubmit={handleSubmit}>
    <Grid
      gridGap="s"
      flow="row"
      gridTemplateColumns="auto auto"
    >
      <Field
        name="firstName"
        label="First name"
        type="text"
        component={ReduxField}
      />
      <Field
        name="lastName"
        label="Last name"
        type="text"
        component={ReduxField}
      />
    </Grid>
    <Field
      name="phone_number"
      label="Phone"
      type="phone"
      component={ReduxField}
      parens
    />
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    <Field
      type="textarea"
      rows="3"
      name="message"
      label="Message"
      component={ReduxField}
    />
    <Button type="submit" width="100%" pad="regular" disabled={submitting || invalid}>
      {submitButtonText}
    </Button>
    {error && <Block color="danger">{error}</Block>}
  </Form>
);

ContactUsForm.defaultProps = {
  submitButtonText: 'Send message',
};

ContactUsForm.propTypes = {
  handleSubmit: func,
  submitting: bool,
  invalid: bool,
  error: string,
  submitButtonText: string,
};

export default ContactUsForm;
