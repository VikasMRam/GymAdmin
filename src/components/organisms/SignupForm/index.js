import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block, Hr, Link } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledBlock = styled(Block)`
  color: ${palette('grayscale', 1)};
  font-size: ${size('text.tiny')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const Login = styled.span`
  color: ${palette('secondary', 0)};

  :hover {
    cursor: pointer;
  }
`;

const SignupForm = ({ handleSubmit, submitting, onLoginClicked }) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>Sign Up</StyledHeading>
    <Field
      name="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      component={ReduxField}
    />
    <Field
      name="password"
      label="Password"
      type="text"
      placeholder="Password"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Sign up
    </StyledButton>
    <StyledBlock>By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.</StyledBlock>
    <StyledHr />
    <Block>Already have a Seniorly account? <Login onClick={onLoginClicked}>Log In</Login></Block>
  </Form>
);

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  onLoginClicked: func,
};

export default SignupForm;
