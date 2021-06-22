import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { CUSTOMER_ROLE, AGENT_ND_ROLE } from 'sly/common/constants/roles';
import rolePropType from 'sly/common/propTypes/role';
import { Block, Button, Form } from 'sly/common/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import IconButton from 'sly/common/components/molecules/IconButton';
import ReduxField from 'sly/common/components/organisms/ReduxField';

const LoginForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, onRegisterClick, role,
  onFacebookLoginClick,
  onGoogleLoginClick, socialLoginError,
}) => (
  <Form onSubmit={handleSubmit}>
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
    <Button
      type="submit"
      pad="regular"
      disabled={submitting || invalid}
      width="100%"
    >
      Log in
    </Button>
    <IconButton
      icon="facebook-f"
      width="100%"
      pad="regular"
      borderPalette="grey"
      palette="slate"
      onClick={onFacebookLoginClick}
      ghost
      noSpaceBetween
    >
      Log in with Facebook
    </IconButton>
    <IconButton
      icon="google"
      width="100%"
      pad={error ? 'large' : 'xLarge'}
      borderPalette="grey"
      palette="slate"
      onClick={onGoogleLoginClick}
      ghost
      noSpaceBetween
    >
      Log in with Google
    </IconButton>
    {socialLoginError && <Block pad="large" palette="danger" size="caption">{socialLoginError}</Block>}
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <ButtonLink pad="large" display="flex" align="center" palette="primary" size="caption" onClick={onResetPasswordClick}>
      Reset password
    </ButtonLink>
    <Block display="flex" align="center" verticalAlign="middle" direction="row">
      {role !== AGENT_ND_ROLE &&
        <Block size="caption" marginRight="small">Don&apos;t have an account?</Block>}
      <ButtonLink palette="primary" size="caption" onClick={onRegisterClick}>
        {role === AGENT_ND_ROLE ? 'Register for an account' : 'Sign up'}
      </ButtonLink>
    </Block>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  onGoogleLoginClick: func.isRequired,
  onFacebookLoginClick: func.isRequired,
  socialLoginError: string,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
  onRegisterClick: func,
  role: rolePropType.isRequired,
};

LoginForm.defaultProps = {
  role: CUSTOMER_ROLE,
};

export default LoginForm;
