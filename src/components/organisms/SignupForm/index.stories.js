import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import SignupForm from '.';

const SignupFormContainer = reduxForm({
  form: 'SignupForm',
  destroyOnUnmount: false,
})(SignupForm);

storiesOf('Organisms|SignupForm', module)
  .add('default', () => (
    <SignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
    />
  ));
