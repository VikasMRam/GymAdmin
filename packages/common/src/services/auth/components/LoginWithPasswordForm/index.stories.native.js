import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginWithPasswordForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LoginWithPasswordFormContainer = reduxForm({
  form: 'LoginWithPasswordForm',
})(LoginWithPasswordForm);

storiesOf('Common|Services/Auth/LoginWithPasswordForm', module)
  .add('default', () => (
    <LoginWithPasswordFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onDoThisLaterClick={action('onDoThisLaterClick clicked')}
      onLoginWithOtpClick={action('onLoginWithOtpClick clicked')}
      onResetPasswordClick={action('onResetPasswordClick clicked')}
      emailOrPhone="test@test.com"
    />
  ))
  .add('with phone', () => (
    <LoginWithPasswordFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onDoThisLaterClick={action('onDoThisLaterClick clicked')}
      onLoginWithOtpClick={action('onLoginWithOtpClick clicked')}
      onResetPasswordClick={action('onResetPasswordClick clicked')}
      emailOrPhone="12345678901"
    />
  ));
