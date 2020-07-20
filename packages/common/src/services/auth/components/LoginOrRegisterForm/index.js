import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import HrWithText from 'sly/web/components/molecules/HrWithText';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { Heading, Button, Block, Icon } from 'sly/web/components/atoms';
import { AGENT_ND_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { textAlign } from 'sly/web/components/helpers/text';

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
  socialLoginError, onEmailPassLoginClick, heading,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
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
    <LoginWithPassword onClick={() => onEmailPassLoginClick(AGENT_ND_ROLE)} palette="primary" size="caption" weight="medium">Are you a partner agent? Sign in here</LoginWithPassword>
    <LoginWithPassword onClick={() => onEmailPassLoginClick(PROVIDER_OD_ROLE)} palette="primary" size="caption" weight="medium">Are you a community provider? Sign in here</LoginWithPassword>
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
  onEmailPassLoginClick: func,
  heading: string,
};

LoginOrRegisterForm.defaultProps = {
  heading: 'Sign up or log in',
};

export default LoginOrRegisterForm;
