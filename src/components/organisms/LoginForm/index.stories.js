import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginForm from 'sly/components/organisms/LoginForm';
import { withPreventDefault } from 'sly/services/helpers/forms';


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
