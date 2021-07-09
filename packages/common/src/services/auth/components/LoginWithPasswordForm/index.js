import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Button, Block, Form } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink/newSystem';

const LoginWithPasswordForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="password"
      label="Password"
      type="password"
      placeholder="Password"
      component={ReduxField}
    />
    <Button
      type="submit"
      width="100%"
      disabled={submitting || invalid}
      pad={error ? 'large' : 'regular'}
    >
      Log in
    </Button>
    <ButtonLink onClick={onResetPasswordClick}>Forgot password</ButtonLink>
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </Form>
);

LoginWithPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
};

export default LoginWithPasswordForm;
