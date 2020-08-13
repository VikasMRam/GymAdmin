import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { email } from 'sly/web/services/validation';
import { phoneFormatter } from 'sly/web/services/helpers/phone';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import HrWithText from 'sly/common/components/molecules/HrWithText';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';

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
    {getButton(error, { type: 'submit', disabled: submitting || invalid, children: 'Log in' })}
    {error && <Block palette="danger" size="caption">{error}</Block>}
    <HrWithText>or</HrWithText>
    <PaddedBlock>Use a one time password for easy log in for your account<br />{!email(emailOrPhone) ? emailOrPhone : phoneFormatter(emailOrPhone, true)}</PaddedBlock>
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
