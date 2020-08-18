import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { email } from 'sly/web/services/validation';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import { Heading, Button, Block, Form } from 'sly/common/components/atoms';
import HrWithText from 'sly/common/components/molecules/HrWithText';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const LoginWithPasswordForm = ({
  handleSubmit, submitting, invalid, error, emailOrPhone, onLoginWithOtpClick, onResetPasswordClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading size="subtitle" pad="0" align="center">Welcome back!</Heading>
    <Heading size="subtitle" pad="xLarge" align="center">Enter your password</Heading>
    <Field
      name="password"
      label="Password"
      labelRight={<Block cursor="pointer" palette="primary" size="caption" onClick={onResetPasswordClick}>Reset password</Block>}
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
    {error && <Block palette="danger" size="caption">{error}</Block>}
    <HrWithText>or</HrWithText>
    <Block align="center">
      Use a one time password for easy log in for your account
    </Block>
    <Block pad="xLarge" align="center">
      {!email(emailOrPhone) ? emailOrPhone : phoneFormatter(emailOrPhone, true)}
    </Block>
    <Button ghost width="100%" onClick={onLoginWithOtpClick}>Log in with a one-time password</Button>
  </Form>
);

LoginWithPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  emailOrPhone: string.isRequired,
  onLoginWithOtpClick: func,
  onResetPasswordClick: func,
};

export default LoginWithPasswordForm;
