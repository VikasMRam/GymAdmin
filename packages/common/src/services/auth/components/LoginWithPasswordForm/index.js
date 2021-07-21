import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Form } from 'sly/common/components/atoms';
import { Block, Button } from 'sly/common/system';
import HrWithText from 'sly/common/components/molecules/HrWithText';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink/newSystem';

const LoginWithPasswordForm = ({
  handleSubmit, submitting, invalid, error, onResetPasswordClick, isEmail, passwordlessClick,
}) => (
  <>
    <Form onSubmit={handleSubmit}>
      <Field
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        component={ReduxField}
      />
      <Button
        type="submit"
        width="100%"
        disabled={submitting || invalid}
        pad="l"
      >
        Log in
      </Button>
      <ButtonLink pad="l" onClick={onResetPasswordClick}>Forgot password</ButtonLink>
      {error && <Block color="red" size="body-m">{error}</Block>}
      <HrWithText>or</HrWithText>
    </Form>
    <Button
      width="100%"
      variant="neutral"
      pad="m"
      marginTop="l"
      onClick={passwordlessClick}
    >
      Continue with {isEmail ? 'magic link' : 'passcode' }
    </Button>
    <Block color="slate.lighter-40" font="body-s"  >
      Don’t know your password? That’s fine, we can {isEmail ? 'email you a link' : 'text you a code'} that will sign you in automatically.
    </Block>
  </>
);

LoginWithPasswordForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
  isEmail: bool,
  passwordlessClick: func.isRequired,
};

export default LoginWithPasswordForm;
