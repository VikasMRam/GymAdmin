import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import fullWidth from 'sly/web/components/helpers/fullWidth';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import ReduxField from 'sly/web/components/organisms/ReduxField';
import { Heading, Button, Block } from 'sly/web/components/atoms';

const FullWidthButton = fullWidth(Button);
FullWidthButton.displayName = 'FullWidthButton';

const LoginForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, onRegisterClick,
}) => (
  <form onSubmit={handleSubmit}>
    <Heading pad="xLarge" size="subtitle">Log in</Heading>
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
    <FullWidthButton
      type="submit"
      pad={error ? 'large' : 'xLarge'}
      disabled={submitting || invalid}
    >
      Log in
    </FullWidthButton>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <ButtonLink pad="large" align="center" palette="primary" size="caption" onClick={onResetPasswordClick}>
      Reset password
    </ButtonLink>
    <Block align="center" size="caption" >
      Don&apos;t have an account?&nbsp;&nbsp;
      <ButtonLink palette="primary" onClick={onRegisterClick}>Sign up</ButtonLink>
    </Block>
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
