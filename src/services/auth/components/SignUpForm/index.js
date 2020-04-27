import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Hr, Link } from 'sly/components/atoms';


const StyledHeading = textAlign(pad(Heading));
StyledHeading.displayName = 'StyledHeading';

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.small')};
`;

const StyledBlock = styled(Block)`
  color: ${palette('slate', 'filler')};
  font-size: ${size('text.tiny')};
  margin-bottom: ${size('spacing.large')};
`;

const Login = textAlign(Block);
Login.displayName = 'Log in';

const SignupForm = ({
                      handleSubmit, submitting, error, onLoginClicked,
                    }) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Sign Up</StyledHeading>
    <Field
      name="name"
      label="Full Name"
      type="name"
      placeholder="First and Last Name"
      component={ReduxField}
    />
    <Field
      name="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      component={ReduxField}
    />
    <Field
      name="phone"
      label="Phone"
      type="phone"
      parens
      placeholder="(415) 555-5555"
      component={ReduxField}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      placeholder="Password"
      component={ReduxField}
    />
    <StyledButton type="submit"  disabled={submitting}>
      Sign Up
    </StyledButton>
    <StyledBlock error={error}>By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.</StyledBlock>
    {error && <Block palette="danger">{error}</Block>}
    <Login size="caption">
      Already have an account?{' '}
      <Link onClick={onLoginClicked}>Log in</Link>
    </Login>
  </form>
);

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onLoginClicked: func,
};

export default SignupForm;
