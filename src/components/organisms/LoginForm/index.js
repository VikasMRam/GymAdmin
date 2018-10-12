import React from 'react';
import { func, bool } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';

import ReduxField from 'sly/components/organisms/ReduxField';

import { Heading, Button, Block, Hr } from 'sly/components/atoms';

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

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledReduxField = styled(ReduxField)`
  display: flex;
  align-items: baseline;
`;

const Signup = styled.span`
  color: ${palette('secondary', 0)};

  :hover {
    cursor: pointer;
  }
`;

const LoginForm = ({ handleSubmit, submitting, onSignupClicked }) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>Log in</StyledHeading>
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
    <Field
      name="rememberme"
      label="Remember me"
      type="checkbox"
      responsive
      component={StyledReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Log in
    </StyledButton>
    <StyledHr />
    <Block>Don&apos;t have an account? <Signup onClick={onSignupClicked}>Sign up</Signup></Block>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  onSignupClicked: func,
};

export default LoginForm;
