import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { textAlign } from 'sly/web/components/helpers/text';
import { Heading, Button, Block, Link } from 'sly/web/components/atoms';

const StyledHeading = pad(Heading);
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

const ProviderSignupForm = ({
  handleSubmit, submitting, error, onLoginClicked,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Create a community manager account</StyledHeading>
    <Field
      name="name"
      label="Full Name"
      type="text"
      placeholder="First and Last Name"
      component={ReduxField}
    />
    <Field
      name="email"
      label="Email Address"
      type="email"
      component={ReduxField}
    />
    <Field
      name="phone_number"
      label="Phone"
      type="phone"
      parens
      component={ReduxField}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={ReduxField}
    />
    <StyledButton type="submit"  disabled={submitting}>
      Continue
    </StyledButton>
    <StyledBlock error={error}>By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.</StyledBlock>
    {error && <Block palette="danger">{error}</Block>}
    <Login size="caption">
      Already have an account?{' '}
      <Link onClick={onLoginClicked}>Log in</Link>
    </Login>
  </form>
);

ProviderSignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onLoginClicked: func,
};

export default ProviderSignupForm;
