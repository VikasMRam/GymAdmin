import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { Heading, Button, Block } from 'sly/web/components/atoms';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledHeading = textAlign(pad(Heading));
StyledHeading.displayName = 'StyledHeading';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const PaddedFullWidthButton = pad(FullWidthButton);
PaddedFullWidthButton.displayName = 'PaddedFullWidthButton';

const ResetPassword = cursor(Block);
ResetPassword.displayName = 'ResetPassword';

const Register = cursor(textAlign(Block));
Register.displayName = 'Register';

const Error = pad(Block);
Error.displayName = 'Error';

const getSubmitButton = (error, props = {}) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <PaddedFullWidthButton {...props} />;

const PartnerAgentLoginForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, onRegisterClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Seniorly Partner Agent Log in</StyledHeading>
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    <Field
      name="password"
      label="Password"
      labelRight={<ResetPassword palette="primary" size="caption" onClick={onResetPasswordClick}>Reset password</ResetPassword>}
      type="password"
      component={ReduxField}
    />
    {getSubmitButton(error, { children: 'Log in', type: 'submit', disabled: submitting || invalid })}
    {error && <Error palette="danger" size="caption">{error}</Error>}
    <Register onClick={onRegisterClick} palette="primary" size="caption" weight="medium">Register for an account</Register>
  </form>
);

PartnerAgentLoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
  onRegisterClick: func,
};

export default PartnerAgentLoginForm;
