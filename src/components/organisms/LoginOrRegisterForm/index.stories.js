import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import LoginOrRegisterForm from 'sly/components/organisms/LoginOrRegisterForm';
import { withPreventDefault } from 'sly/services/helpers/forms';

const LoginOrRegisterFormContainer = reduxForm({
  form: 'LoginOrRegisterForm',
  destroyOnUnmount: false,
})(LoginOrRegisterForm);

storiesOf('Organisms|LoginOrRegisterForm', module)
  .add('default', () => (
    <LoginOrRegisterFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSignupClicked={withPreventDefault(action('sign up clicked'))}
    />
  ));
