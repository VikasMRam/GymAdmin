import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import ReduxField from 'sly/components/organisms/ReduxField';
import { Heading, Button, Block } from 'sly/components/atoms';

const Form = styled.form`
  width: 100%;
`;
Form.displayName = 'Form';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const Description = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledField = styled(Field)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const BottomWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  flex: 1 1 0;
  margin-bottom: ${size('spacing.regular')};
  margin-bottom: ${ifProp('error', size('spacing.large'), 'initial')};
`;

const Login = styled.span`
  flex: 1 1 0;
  display: flex;
  align-items: center;
  color: ${palette('secondary', 'dark35')};

  :hover {
    cursor: pointer;
  }
`;
Login.displayName = 'LoginLink';

const ResetPasswordForm = ({
  handleSubmit, submitting, onLoginClicked, error,
}) => (
  <Form onSubmit={handleSubmit}>
    <StyledHeading>Reset Password</StyledHeading>
    <Description>Enter your email address below and we will send you instructions.</Description>
    <StyledField
      name="email"
      label="Email Address"
      type="email"
      placeholder="Email Address"
      component={ReduxField}
    />
    {error && <Block palette="danger">{error}</Block>}
    <BottomWrapper>
      <Login onClick={onLoginClicked}>Back to Login</Login>
      <StyledButton error={error} type="submit" kind="jumbo" disabled={submitting}>
        Send Request Link
      </StyledButton>
    </BottomWrapper>
  </Form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  onLoginClicked: func,
  error: string,
};

export default ResetPasswordForm;
