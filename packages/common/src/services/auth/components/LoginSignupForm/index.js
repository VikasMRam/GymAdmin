import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { CUSTOMER_ROLE, AGENT_ND_ROLE } from 'sly/common/constants/roles';
import rolePropType from 'sly/common/propTypes/role';
import { Block, Button, Form } from 'sly/common/components/atoms';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import IconButton from 'sly/common/components/molecules/IconButton';
import HrWithText from 'sly/common/components/molecules/HrWithText';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import { phoneFormatterWithEmailOption } from 'sly/web/services/helpers/phone';


const LoginSignupForm = ({
  handleSubmit, submitting, invalid, error, onGoToSignUp, role,
  onFacebookLoginClick,
  onGoogleLoginClick, socialLoginError,
}) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="email"
      label="Email or phone number"
      type="email"
      component={ReduxField}
      format={phoneFormatterWithEmailOption}
    />

    <Button
      type="submit"
      pad="regular"
      disabled={submitting || invalid}
      width="100%"
    >
      Continue
    </Button>
    <HrWithText>or</HrWithText>
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
      Continue with Facebook
    </IconButton>
    <IconButton
      icon="google"
      width="100%"
      pad={error ? 'large' : '0'}
      borderPalette="grey"
      palette="slate"
      onClick={onGoogleLoginClick}
      ghost
      noSpaceBetween
    >
      Continue with Google
    </IconButton>
    {socialLoginError && <Block pad="large" palette="danger" size="caption">{socialLoginError}</Block>}
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <Block display="flex" align="center" verticalAlign="middle" direction="row">
      {role === AGENT_ND_ROLE &&
      <ButtonLink palette="primary" size="caption" onClick={onGoToSignUp}>
        Register for an account
      </ButtonLink>}
    </Block>
  </Form>
);

LoginSignupForm.propTypes = {
  handleSubmit: func.isRequired,
  onGoogleLoginClick: func.isRequired,
  onFacebookLoginClick: func.isRequired,
  socialLoginError: string,
  submitting: bool,
  invalid: bool,
  error: string,
  onResetPasswordClick: func,
  onGoToSignUp: func,
  role: rolePropType.isRequired,
};

LoginSignupForm.defaultProps = {
  role: CUSTOMER_ROLE,
};

export default LoginSignupForm;
