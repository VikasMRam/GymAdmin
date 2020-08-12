import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import SignupForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const SignupFormContainer = reduxForm({
  form: 'SignupForm',
})(SignupForm);

storiesOf('Common|Services/Auth/SignupForm', module)
  .add('default', () => (
    <SignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
    />
  ))
  .add('hasProviderSignup', () => (
    <SignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
      hasProviderSignup={false}
    />
  ))
  .add('heading', () => (
    <SignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
      heading="Custom Heading"
    />
  ))
  .add('submitButtonText', () => (
    <SignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
      submitButtonText="Custom button text"
    />
  ));
