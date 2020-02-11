import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginWithPasswordForm from 'sly/components/organisms/LoginWithPasswordForm';
import { withPreventDefault } from 'sly/services/helpers/forms';

const LoginWithPasswordFormContainer = reduxForm({
  form: 'LoginWithPasswordForm',
})(LoginWithPasswordForm);

storiesOf('Organisms|LoginWithPasswordForm', module)
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
