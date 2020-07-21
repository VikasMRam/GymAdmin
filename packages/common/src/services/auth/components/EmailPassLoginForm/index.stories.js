import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import EmailPassLoginForm from './';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const EmailPassLoginFormContainer = reduxForm({
  form: 'EmailPassLoginForm',
})(EmailPassLoginForm);

storiesOf('Organisms|EmailPassLoginForm', module)
  .add('default', () => (
    <EmailPassLoginFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onResetPasswordClick={action('reset password clicked')}
      onRegisterClick={action('register clicked')}
    />
  ));
