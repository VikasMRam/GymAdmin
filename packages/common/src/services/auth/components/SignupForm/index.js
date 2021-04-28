import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Block, Button, Form, Grid } from 'sly/common/components/atoms';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import IconButton from 'sly/common/components/molecules/IconButton';

const SignupForm = ({
  handleSubmit, submitting, invalid, error, onLoginClicked, onProviderClicked, submitButtonText, hasPassword,
  hasPreference, onFacebookSignUpClick,
  onGoogleSignUpClick,  hasProviderSignup,
  socialSignupError, handleOtpClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Grid gap="small">
      <Field
        name="firstName"
        label="First Name"
        type="text"
        component={ReduxField}
      />
      <Field
        name="lastName"
        label="Last Name"
        type="text"
        component={ReduxField}
      />
    </Grid>
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
      component={ReduxField}
      parens
    />
    {hasPassword &&
      <Field
        name="password"
        label="Password"
        type="password"
        component={ReduxField}
      />
    }
    {hasPreference &&
    <Field
      name="phonePreference"
      fullWidth
      type="checkbox"
      component={ReduxField}
      options={[{ value: 'text', label: 'I prefer text over calls' }]}
    />

    }
    <Block marginBottom={error === 'user already exists' ? 'regular' : 'large'}>
      <Button type="submit" width="100%" pad="regular" disabled={submitting || invalid}>
        {submitButtonText}
      </Button>
      <IconButton
        icon="facebook-f"
        width="100%"
        pad="regular"
        borderPalette="grey"
        palette="slate"
        onClick={onFacebookSignUpClick}
        ghost
        noSpaceBetween
      >
        {submitButtonText} with Facebook
      </IconButton>
      <IconButton
        icon="google"
        width="100%"
        pad="regular"
        borderPalette="grey"
        palette="slate"
        onClick={onGoogleSignUpClick}
        ghost
        noSpaceBetween
      >
        {submitButtonText} with Google
      </IconButton>
    </Block>
    {socialSignupError && <Block pad="large" palette="danger" size="caption">{socialSignupError}</Block>}
    {error && <Block textAlign="center" palette="danger" size="caption">{error}</Block>}
    <Block marginBottom="xLarge"> <TosAndPrivacy openLinkInNewTab /> </Block>

    <Grid flow="row" gap="large" verticalAlign="middle">
      <Block display="flex" align="center" direction="row" size="caption">
        Already have an account?&nbsp;&nbsp;
        <ButtonLink palette="primary" size="caption" onClick={onLoginClicked}>Log in</ButtonLink>
      </Block>
      {hasProviderSignup &&
        <Block display="flex" align="center" direction="row" size="caption">
          Are you a community manager?&nbsp;&nbsp;
          <ButtonLink palette="primary" size="caption" onClick={onProviderClicked}>Click here</ButtonLink>
        </Block>
      }
    </Grid>
  </Form>
);

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  onFacebookSignUpClick: func.isRequired,
  onGoogleSignUpClick: func.isRequired,
  submitting: bool,
  hasProviderSignup: bool.isRequired,
  invalid: bool,
  error: string,
  socialLoginError: string,
  onLoginClicked: func,
  onProviderClicked: func,
  submitButtonText: string.isRequired,
  hasPassword: bool,
  hasPreference: bool,
  socialSignupError: string,
  handleOtpClick: func.isRequired,
};

SignupForm.defaultProps = {
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
  hasPreference: true,
};

export default SignupForm;
