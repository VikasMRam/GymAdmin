import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import HrWithText from 'sly/components/molecules/HrWithText';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block } from 'sly/components/atoms';

const StyledHeading = textAlign(pad(Heading));

const FullWidthButton = fullWidth(Button);

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');

const PaddedBlock = textAlign(pad(Block));

const forgotPasswordLabel = (
  <Block palette="primary" size="caption">Reset password</Block>
);

const getButton = (error, props) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const LoginWithPasswordForm = ({
  handleSubmit, submitting, invalid, error, emailOrPhone, onLoginWithOtpClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Welcome back!<br />Enter your password</StyledHeading>
    <Field
      name="password"
      label="Password"
      labelRight={forgotPasswordLabel}
      type="password"
      placeholder="Password"
      component={ReduxField}
    />
    {getButton(error, { type: 'submit', ghost: true, disabled: submitting || invalid, children: 'Log in' })}
    {error && <Block palette="danger" size="caption">{error}</Block>}
    <HrWithText text="or" />
    <PaddedBlock>Use a one time password for easy log in for your account<br />{emailOrPhone}</PaddedBlock>
    <FullWidthButton ghost onClick={onLoginWithOtpClick}>Log in with a one-time password</FullWidthButton>
  </form>
);

LoginWithPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onDoThisLaterClick: func,
  emailOrPhone: string.isRequired,
  onLoginWithOtpClick: func,
};

export default LoginWithPasswordForm;
