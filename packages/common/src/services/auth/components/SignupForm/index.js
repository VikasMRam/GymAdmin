import React from 'react';
import { func, bool, string } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/common/components/themes';
import { Block, Button, Form, Grid } from 'sly/common/components/atoms';
import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import ReduxField from 'sly/common/components/organisms/ReduxField';
import ButtonLink from 'sly/common/components/molecules/ButtonLink';

const SignupForm = ({
  handleSubmit, submitting, invalid, error, onLoginClicked, onProviderClicked, submitButtonText, hasPassword,
  hasPreference, hasProviderSignup,
}) => (
  <Form width="max-content" onSubmit={handleSubmit}>
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
    <Block marginBottom={size('spacing.large')}>
      <Button type="submit" width="100%" pad="regular" disabled={submitting || invalid}>
        {submitButtonText}
      </Button>
    </Block>
    <Block marginBottom={size('spacing.xLarge')}> <TosAndPrivacy  /> </Block>
    {error && <Block palette="danger" size="caption">{error}</Block>}
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
  submitting: bool,
  hasProviderSignup: bool.isRequired,
  invalid: bool,
  error: string,
  onLoginClicked: func,
  onProviderClicked: func,
  submitButtonText: string.isRequired,
  hasPassword: bool,
  hasPreference: bool,
};

SignupForm.defaultProps = {
  submitButtonText: 'Sign Up',
  hasProviderSignup: true,
  hasPreference: true,
};

export default SignupForm;
