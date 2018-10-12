import React from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Button, Hr, Block, Icon, Heading } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};

  span {
    margin-right: ${size('spacing.regular')};
  }
`;
StyledButton.displayName = 'StyledButton';

const GoogleButton = StyledButton.extend`
  border-color: ${palette('grayscale', 2)};

  span {
    margin-right: ${size('spacing.large')};
  }
`;
GoogleButton.displayName = 'GoogleButton';

const FacebookButton = StyledButton.extend`
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
  color: ${palette('secondary', 0)};

  :hover {
    cursor: pointer;
  }
`;
Login.displayName = 'Login';

const JoinSlyButtons = ({
  onLoginClicked, onEmailSignupClicked, onContinueWithFacebookClicked, heading,
}) => (
  <section>
    <StyledHeading>{heading}</StyledHeading>
    <FacebookButton palette="facebook" onClick={onContinueWithFacebookClicked}>
      <Icon icon="facebook" size="regular" /> Continue with Facebook
    </FacebookButton>
    <GoogleButton transparent>
      <Icon icon="google" size="regular" /> Continue with Google
    </GoogleButton>
    <StyledHr />
    <StyledButton onClick={onEmailSignupClicked}>Sign up with Email</StyledButton>
    <Hr />
    <Block>
      Already have a Seniorly account? <Login onClick={onLoginClicked}>Log in</Login>
    </Block>
  </section>
);

JoinSlyButtons.propTypes = {
  onLoginClicked: func,
  onEmailSignupClicked: func,
  onContinueWithFacebookClicked: func,
  heading: string,
};

JoinSlyButtons.defaultProps = {
  heading: 'Join Seniorly',
};

export default JoinSlyButtons;
