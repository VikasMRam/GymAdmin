import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import fullWidth from 'sly/components/helpers/fullWidth';
import textAlign from 'sly/components/helpers/textAlign';
import cursor from 'sly/components/helpers/cursor';
import HrWithText from 'sly/components/molecules/HrWithText';
import TosAndPrivacy from 'sly/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Icon } from 'sly/components/atoms';

const StyledHeading = textAlign(pad(Heading));

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const SocialLoginError = pad(Block, 'large');
SocialLoginError.displayName = 'SocialLoginError';

const LoginWithPassword = cursor(textAlign(Block));
LoginWithPassword.displayName = 'LoginWithPassword';

const Error = pad(Block);
Error.displayName = 'Error';

const PaddedTosAndPrivacy = pad(textAlign(TosAndPrivacy), 'xxLarge');

const getSubmitButton = (error, props = {}) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <FullWidthButton {...props} />;

const LoginOrRegisterForm = ({
  handleSubmit, submitting, invalid, error, onFacebookSigninClick, onGoogleSigninClick,
  socialLoginError, onPartnerAgentLoginClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Sign up or log in</StyledHeading>
    <Field
      name="emailOrPhone"
      type="text"
      placeholder="Enter your email or phone"
      component={ReduxField}
    />
    {getSubmitButton(error, { children: 'Continue', type: 'submit', disabled: submitting || invalid })}
    {error && <Error palette="danger" size="caption">{error}</Error>}
    <HrWithText text="or" />
    <LargePaddedFullWidthButton ghost palette="slate" borderPalette="grey" onClick={onFacebookSigninClick}>
      <StyledIcon icon="facebook-f" size="caption" /> Continue with Facebook
    </LargePaddedFullWidthButton>
    <LargePaddedFullWidthButton ghost palette="slate" borderPalette="grey" onClick={onGoogleSigninClick}>
      <StyledIcon icon="google" size="caption" /> Continue with Google
    </LargePaddedFullWidthButton>
    {socialLoginError && <SocialLoginError palette="danger" size="caption">{socialLoginError}</SocialLoginError>}
    <PaddedTosAndPrivacy />
    <LoginWithPassword onClick={onPartnerAgentLoginClick} palette="primary" size="caption" weight="medium">Are you a partner agent? Sign in here</LoginWithPassword>
  </form>
);

LoginOrRegisterForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  socialLoginError: string,
  onFacebookSigninClick: func,
  onGoogleSigninClick: func,
  onPartnerAgentLoginClick: func,
};

export default LoginOrRegisterForm;
