import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';


import { size, palette } from 'sly/components/themes';
import { Button, Hr, Block, Icon, Heading } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};

  span {
    margin-right: ${size('spacing.regular')};
  }
`;
StyledButton.displayName = 'StyledButton';

const GoogleButton = styled(StyledButton)`
  border-color: ${palette('slate', 'stroke')};

  span {
    margin-right: ${size('spacing.large')};
  }
`;
GoogleButton.displayName = 'GoogleButton';

const FacebookButton = styled(StyledButton)`
  background-color: #4568b2;
  margin-bottom: ${size('spacing.large')};
`;
FacebookButton.displayName = 'FacebookButton';

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;
StyledHeading.displayName = 'StyledHeading';

const Login = styled.span`
  color: ${palette('secondary', 'base')};

  :hover {
    cursor: pointer;
  }
`;
Login.displayName = 'Login';

const SocialLoginError = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;
SocialLoginError.displayName = 'SocialLoginError';

const JoinSlyButtons = ({
  onLoginClicked, onEmailSignupClicked, onContinueWithFacebookClicked, heading,
  onContinueWithGoogleClicked, socialLoginError,
}) => (
  <section>
    <StyledHeading>{heading}</StyledHeading>
    <FacebookButton onClick={onContinueWithFacebookClicked}>
      <Icon icon="facebook-f" /> Continue with Facebook
    </FacebookButton>
    <GoogleButton transparent onClick={onContinueWithGoogleClicked} error={socialLoginError}>
      <Icon icon="google" /> Continue with Google
    </GoogleButton>
    {socialLoginError && <SocialLoginError palette="danger">{socialLoginError}</SocialLoginError>}
    <StyledHr />
    <StyledButton onClick={onEmailSignupClicked}>Sign up with Email</StyledButton>
    <Hr />
    <Block>
      Already have a Seniorly account? <Login onClick={onLoginClicked}>Sign in</Login>
    </Block>
  </section>
);

JoinSlyButtons.propTypes = {
  onLoginClicked: func,
  onEmailSignupClicked: func,
  onContinueWithFacebookClicked: func,
  onContinueWithGoogleClicked: func,
  heading: string,
  socialLoginError: string,
};

JoinSlyButtons.defaultProps = {
  heading: 'Create an account',
};

export default JoinSlyButtons;
