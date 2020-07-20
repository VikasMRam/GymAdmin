import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import EmailPassLoginForm from 'sly/common/services/auth/components/EmailPassLoginForm/index';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

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
