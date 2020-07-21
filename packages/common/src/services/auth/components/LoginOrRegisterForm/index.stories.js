import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginOrRegisterForm from './';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LoginOrRegisterFormContainer = reduxForm({
  form: 'LoginOrRegisterForm',
})(LoginOrRegisterForm);

storiesOf('Organisms|LoginOrRegisterForm', module)
  .add('default', () => (
    <LoginOrRegisterFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSignupClick={action('sign up clicked')}
      onFacebookSigninClick={action('facebook login clicked')}
      onGoogleSigninClick={action('google login clicked')}
      onEmailPassLoginClick={action('partner agent login clicked')}
    />
  ));
