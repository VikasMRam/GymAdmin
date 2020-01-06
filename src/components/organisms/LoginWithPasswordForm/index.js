import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import cursor from 'sly/components/helpers/cursor';
import { Heading, Button, Block } from 'sly/components/atoms';
import HrWithText from 'sly/components/molecules/HrWithText';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledHeading = textAlign(pad(Heading));

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const PaddedBlock = textAlign(pad(Block));
PaddedBlock.displayName = 'PaddedBlock';

const ResetPassword = cursor(Block);

const getButton = (error, props) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const LoginWithPasswordForm = ({
  handleSubmit, submitting, invalid, error, emailOrPhone, onLoginWithOtpClick, onResetPasswordClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Welcome back!<br />Enter your password</StyledHeading>
    <Field
      name="password"
      label="Password"
      labelRight={<ResetPassword palette="primary" size="caption" onClick={onResetPasswordClick}>Reset password</ResetPassword>}
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
  emailOrPhone: string.isRequired,
  onLoginWithOtpClick: func,
  onResetPasswordClick: func,
};

export default LoginWithPasswordForm;
