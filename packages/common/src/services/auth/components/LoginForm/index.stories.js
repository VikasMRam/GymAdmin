import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LoginFormContainer = reduxForm({
  form: 'LoginForm',
})(LoginForm);

storiesOf('Organisms|LoginForm', module)
  .add('default', () => (
    <LoginFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onResetPasswordClick={action('reset password clicked')}
      onRegisterClick={action('register clicked')}
    />
  ));
