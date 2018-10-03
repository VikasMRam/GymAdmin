import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Button, Hr, Block, Link, Icon } from 'sly/components/atoms';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};

  span {
    margin-right: ${size('spacing.regular')};
  }
`;
const GoogleButton = StyledButton.extend`
  border-color: ${palette('grayscale', 2)};

  span {
    margin-right: ${size('spacing.large')};
  }
`;

const JoinSlyButtons = () => (
  <div>
    <StyledButton palette="facebook"><Icon icon="facebook" size="regular" /> Continue with Facebook</StyledButton>
    <br />
    <GoogleButton transparent><Icon icon="google" size="regular" /> Continue with Google</GoogleButton>
    <Hr />
    <StyledButton>Sign up with Email</StyledButton>
    <Hr />
    <Block>
      Already have a Seniorly account? <Link to="/sign-in">Log in</Link>
    </Block>
  </div>
);

export default JoinSlyButtons;
