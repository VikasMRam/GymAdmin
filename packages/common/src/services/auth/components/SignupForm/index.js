import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { Heading, Block, Button, Form, Grid } from 'sly/common/components/atoms';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';

const SignupForm = ({
  handleSubmit, submitting, invalid, error, onLoginClicked, onProviderClicked, heading, submitButtonText, hasPassword,
  hasProviderSignup,
}) => (
  <Form onSubmit={handleSubmit}>
    <Heading pad="xLarge" size="subtitle">{heading}</Heading>
    <Grid gap="regular">
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
    <Button type="submit" width="100%" pad="regular" disabled={submitting || invalid}>
      {submitButtonText}
    </Button>
    {/* TODO: this should reuse Tos and privacy molecule after Link is migrated for mobile */}
    <Block pad="large" size="tiny" palette="slate" variation="filler">
      By continuing, you agree to Seniorly&apos;s Terms of Use and Privacy Policy.
    </Block>
    {error && <Block palette="danger" size="caption">{error}</Block>}
    <Grid flow="row" gap="large" verticalAlign="middle">
      <Block align="center" direction="row" size="caption">
        Already have an account?&nbsp;&nbsp;
        <ButtonLink palette="primary" onClick={onLoginClicked}>Log in</ButtonLink>
      </Block>
      {hasProviderSignup &&
        <Block align="center" direction="row" size="caption">
          Are you a community manager?&nbsp;&nbsp;
          <ButtonLink palette="primary" onClick={onProviderClicked}>Click here</ButtonLink>
        </Block>
      }
    </Grid>
  </Form>
);

SignupForm.propTypes = {
  handleSubmit: func.isRequired,
  submitting: bool,
  hasProviderSignup: bool.isRequired,
  invalid: bool,
  error: string,
  onLoginClicked: func,
  onProviderClicked: func,
  heading: string.isRequired,
  submitButtonText: string.isRequired,
  hasPassword: bool,
};

SignupForm.defaultProps = {
  heading: 'Sign Up',
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
};

export default SignupForm;
