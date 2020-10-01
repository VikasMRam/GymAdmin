import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Heading, Button, Block, Form } from 'sly/common/components/atoms';
import HrWithText from 'sly/common/components/molecules/HrWithText';
// import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';
import IconButton from 'sly/common/components/molecules/IconButton';

const CommunityManagerRegisterForm = ({
  handleSubmit, submitting, invalid, error, onFacebookSigninClick, onGoogleSigninClick,
  socialLoginError, heading, onEmailPassLoginClick,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading pad="xLarge" align="center" size="subtitle">{heading}</Heading>
    <Field
      name="name"
      type="text"
      placeholder="Enter your name"
      component={ReduxField}
    />
    <Field
      name="email"
      type="email"
      placeholder="Enter your email"
      component={ReduxField}
    />
    <Button
      type="submit"
      pad={error ? 'large' : undefined}
      disabled={submitting || invalid}
      width="100%"
    >
      Continue
    </Button>
    {error && <Block pad="xLarge" palette="danger" size="caption">{error}</Block>}
    <HrWithText>or</HrWithText>
    <IconButton
      icon="facebook-f"
      width="100%"
      pad="large"
      borderPalette="grey"
      palette="slate"
      onClick={onFacebookSigninClick}
      ghost
      noSpaceBetween
    >
      Continue with Facebook
    </IconButton>
    <IconButton
      icon="google"
      width="100%"
      pad="large"
      borderPalette="grey"
      palette="slate"
      onClick={onGoogleSigninClick}
      ghost
      noSpaceBetween
    >
      Continue with Google
    </IconButton>
    {socialLoginError && <Block pad="large" palette="danger" size="caption">{socialLoginError}</Block>}
    {/* <TosAndPrivacy pad="xxLarge" align="center" /> */}
    <ButtonLink onClick={onEmailPassLoginClick} display="flex" align="center" palette="primary" size="caption" weight="medium">
      Log in instead
    </ButtonLink>
  </Form>
);

CommunityManagerRegisterForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  invalid: bool,
  error: string,
  socialLoginError: string,
  onFacebookSigninClick: func,
  onGoogleSigninClick: func,
  onEmailPassLoginClick: func,
  heading: string,
};

CommunityManagerRegisterForm.defaultProps = {
  heading: 'Sign up or log in',
};

export default CommunityManagerRegisterForm;
