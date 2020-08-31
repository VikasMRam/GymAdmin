import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Heading, Button, Block, Form } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';

const CreatePasswordForm = ({
  handleSubmit, submitting, invalid, error, onDoThisLaterClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading size="subtitle" pad="large">Create a new account</Heading>
    <Block pad="xLarge">Please set a password</Block>
    <Field
      name="password"
      type="password"
      label="Password"
      component={ReduxField}
    />
    <Button type="submit" pad="large" width="100%" disabled={submitting || invalid}>Save Password</Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <ButtonLink onClick={onDoThisLaterClick} align="center" palette="primary" size="caption">Skip for now</ButtonLink>
  </Form>
);

CreatePasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onSignupClick: func,
  error: string,
  onDoThisLaterClick: func,
};

export default CreatePasswordForm;
