import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ResetPasswordForm from 'sly/web/services/auth/components/ResetPasswordForm/index';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const ResetPasswordFormContainer = reduxForm({
  form: 'ResetPasswordForm',
})(ResetPasswordForm);

storiesOf('Organisms|ResetPasswordForm', module)
  .add('default', () => (
    <ResetPasswordFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClick={action('onLoginClick clicked')}
    />
  ));
