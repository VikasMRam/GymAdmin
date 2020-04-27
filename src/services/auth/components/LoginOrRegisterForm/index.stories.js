import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginOrRegisterForm from 'sly/services/auth/components/LoginOrRegisterForm/index';
import { withPreventDefault } from 'sly/services/helpers/forms';

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
      onPartnerAgentLoginClick={action('partner agent login clicked')}
    />
  ));