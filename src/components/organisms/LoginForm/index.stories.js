import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import LoginForm from '.';

const LoginFormContainer = reduxForm({
  form: 'LoginForm',
  destroyOnUnmount: false,
})(LoginForm);

storiesOf('Organisms|LoginForm', module)
  .add('default', () => (
    <LoginFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSignupClicked={withPreventDefault(action('sign up clicked'))}
    />
  ));
