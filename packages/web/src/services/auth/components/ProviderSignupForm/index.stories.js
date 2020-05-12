import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import SignupForm from 'sly/web/components/organisms/SignupForm';
import { withPreventDefault } from 'sly/web/services/helpers/forms';


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
