import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block, Hr, Span } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;
Form.displayName = 'Form';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: ${size('spacing.regular')};
`;
StyledButton.displayName = 'StyledButton';

const StyledBlock = styled(Block)`
  color: ${palette('slate', 'filler')};
  font-size: ${size('text.tiny')};
  margin-bottom: ${ifProp('error', size('spacing.large'), 'initial')};
`;

const StyledHr = styled(Hr)`
  margin-top: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const Login = styled(Span)`
  :hover {
    cursor: pointer;
  }
`;
Login.displayName = 'Login';

const ProviderSignupForm = ({
                      handleSubmit, submitting, error, onLoginClicked,
                    }) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>Create an account</StyledHeading>
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
      type="password"
      placeholder="Password"
      component={ReduxField}
    />
    <StyledButton type="submit" kind="jumbo" disabled={submitting}>
      Create account
    </StyledButton>
    <StyledBlock error={error}>By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.</StyledBlock>
    {error && <Block palette="danger">{error}</Block>}
    <StyledHr />
    <Block>Already have a Seniorly account? <Login palette="primary" onClick={onLoginClicked}>Sign in</Login></Block>
  </Form>
);

ProviderSignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  error: string,
  onLoginClicked: func,
};

export default ProviderSignupForm;
