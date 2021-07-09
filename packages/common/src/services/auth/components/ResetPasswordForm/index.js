import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block, Form, Hr } from 'sly/common/components/atoms';
import { Button } from 'sly/common/system';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const ResetPasswordForm = ({
  handleSubmit, submitting, invalid, onLoginClick, error,
}) => (
  <Form onSubmit={handleSubmit}>
    <Block pad="xLarge">Enter the email address associated with your account, and we’ll email you a link to reset your password.</Block>
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    <Button
      type="submit"
      variant="secondary"
      pad={error ? 'm' : null}
      disabled={submitting || invalid}
      width="100%"
    >
      Send reset password link
    </Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <Hr />
    <Block display="flex" align="center" direction="row" size="caption">
      Remember your password?&nbsp;&nbsp;
      <ButtonLink palette="primary" size="caption" onClick={onLoginClick}>Sign in</ButtonLink>
    </Block>
  </Form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  onLoginClick: func,
  error: string,
};

export default ResetPasswordForm;
