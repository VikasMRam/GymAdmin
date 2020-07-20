import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import pad from 'sly/web/components/helpers/pad';
import fullWidth from 'sly/web/components/helpers/fullWidth';
import cursor from 'sly/web/components/helpers/cursor';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { Heading, Button, Block, Link } from 'sly/web/components/atoms';
import { textAlign } from 'sly/web/components/helpers/text';

const StyledHeading = pad(Heading);
StyledHeading.displayName = 'StyledHeading';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LargePaddedFullWidthButton = pad(FullWidthButton, 'large');
LargePaddedFullWidthButton.displayName = 'LargePaddedFullWidthButton';

const PaddedFullWidthButton = pad(FullWidthButton);
PaddedFullWidthButton.displayName = 'PaddedFullWidthButton';


const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
`;
const ResetPassword = cursor(textAlign(StyledBlock));
ResetPassword.displayName = 'ResetPassword';

const Register = textAlign(Block);
Register.displayName = 'Register';

const Error = pad(Block);
Error.displayName = 'Error';

const getSubmitButton = (error, props = {}) =>
  error ? <LargePaddedFullWidthButton {...props} /> : <PaddedFullWidthButton {...props} />;

const LoginForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, onRegisterClick,
}) => (
  <form onSubmit={handleSubmit}>
    <StyledHeading size="subtitle">Log in</StyledHeading>
    <Field
      name="email"
      label="Email"
      type="email"
      component={ReduxField}
    />
    <Field
      name="password"
      label="Password"
      type="password"
      component={ReduxField}
    />
    {getSubmitButton(error, { children: 'Log in', type: 'submit', disabled: submitting || invalid })}
    {error && <Error palette="danger" size="caption">{error}</Error>}
    <ResetPassword palette="primary" size="caption"  onClick={onResetPasswordClick}>
      Reset password
    </ResetPassword>
    <Register size="caption" >
      Don't have an account?{' '}
      <Link onClick={onRegisterClick}>Sign up</Link>
    </Register>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
  onRegisterClick: func,
};

export default LoginForm;
