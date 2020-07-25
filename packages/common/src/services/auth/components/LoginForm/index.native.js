import React from 'react';
import { View } from 'react-native';
import { func, bool, string } from 'prop-types';

import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import { Heading, Block, Button } from 'sly/common/components/atoms';

const LoginForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, onRegisterClick,
}) => (
  <View style={{ width: '100%' }} onSubmit={handleSubmit}>
    <Heading pad="xLarge" size="subtitle">Log in</Heading>
    <Button
      type="submit"
      pad={error ? 'large' : 'xLarge'}
      disabled={submitting || invalid}
      width="100%"
    >
      Log in
    </Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <ButtonLink pad="large" align="center" palette="primary" size="caption" onClick={onResetPasswordClick}>
      Reset password
    </ButtonLink>
    <Block align="center" size="caption">
      Don&apos;t have an account?&nbsp;&nbsp;
      <ButtonLink palette="primary" onClick={onRegisterClick}>Sign up</ButtonLink>
    </Block>
  </View>
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
