import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Hr } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;
Form.displayName = 'Form';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${ifProp('error', size('spacing.large'), size('spacing.regular'))};
`;
StyledButton.displayName = 'StyledButton';

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledReduxField = styled(ReduxField)`
  display: flex;
  align-items: baseline;
`;

const Signup = styled.span`
  color: ${palette('secondary', 'base')};

  :hover {
    cursor: pointer;
  }
`;

const ForgotPassword = Signup.extend`
  float: right;
`;

const LoginForm = ({
  handleSubmit, submitting, onSignupClicked, error,
  onForgotPasswordClicked,
}) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>Log in</StyledHeading>
    <Field
      name="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      component={ReduxField}
    />
    <ForgotPassword onClick={onForgotPasswordClicked}>Forgot password?</ForgotPassword>
    <Field
      name="password"
      label="Password"
      type="password"
      placeholder="Password"
      component={ReduxField}
    />
    <Field
      name="rememberme"
      label="Remember me"
      type="checkbox"
      responsive
      component={StyledReduxField}
    />
    <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
      Log in
    </StyledButton>
    {error && <Block palette="danger">{error}</Block>}
    <StyledHr />
    <Block>Don&apos;t have an account? <Signup onClick={onSignupClicked}>Sign up</Signup></Block>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  onForgotPasswordClicked: func,
  submitting: bool,
  onSignupClicked: func,
  error: string,
};

export default LoginForm;
