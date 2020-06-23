import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import HrWithText from 'sly/web/components/molecules/HrWithText';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { Heading, Button, Block, Icon } from 'sly/web/components/atoms';
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

const CommunityManagerRegisterForm = ({
  handleSubmit, submitting, invalid, error, onFacebookSigninClick, onGoogleSigninClick,
  socialLoginError, heading,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">{heading}</StyledHeading>
    <Field
      name="name"
      type="text"
      placeholder="Enter your name"
      component={ReduxField}
    />
    <Field
      name="email"
      type="email"
      placeholder="Enter your email"
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
    <LoginWithPassword onClick={() => {}} palette="primary" size="caption" weight="medium">Log in instead</LoginWithPassword>
  </form>
);

CommunityManagerRegisterForm.propTypes = {
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

CommunityManagerRegisterForm.defaultProps = {
  heading: 'Sign up or log in',
};

export default CommunityManagerRegisterForm;
