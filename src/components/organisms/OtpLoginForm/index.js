import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { email } from 'sly/services/validation';
import { phoneFormatter } from 'sly/services/helpers/phone';
import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import cursor from 'sly/components/helpers/cursor';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block } from 'sly/components/atoms';

const StyledHeading = textAlign(pad(Heading));
StyledHeading.displayName = 'StyledHeading';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const SocialLoginError = pad(Block, 'large');
SocialLoginError.displayName = 'SocialLoginError';

const LoginWithPassword = cursor(textAlign(Block));
LoginWithPassword.displayName = 'LoginWithPassword';

const ResetPassword = cursor(Block);
ResetPassword.displayName = 'ResetPassword';

const getSubmitButton = (error, props = {}) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const OtpLoginForm = ({
  handleSubmit, submitting, invalid, error, emailOrPhone, onResendCodeClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Enter the code sent to {!email(emailOrPhone) ? emailOrPhone : phoneFormatter(emailOrPhone, true)}</StyledHeading>
    <Field
      name="code"
      label="Code"
      labelRight={<ResetPassword palette="primary" size="caption" onClick={onResendCodeClick}>Resend code</ResetPassword>}
      type="text"
      placeholder="6-digit code"
      component={ReduxField}
    />
    {getSubmitButton(error, { children: 'Log in', type: 'submit', disabled: submitting || invalid })}
    {error && <Block palette="danger" size="caption">{error}</Block>}
  </form>
);

OtpLoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  emailOrPhone: string.isRequired,
  onResendCodeClick: func,
};

export default OtpLoginForm;
