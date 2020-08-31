import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ResetPasswordForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ResetPasswordFormContainer = reduxForm({
  form: 'ResetPasswordForm',
})(ResetPasswordForm);

storiesOf('Common|Services/Auth/ResetPasswordForm', module)
  .add('default', () => (
    <ResetPasswordFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClick={action('onLoginClick clicked')}
    />
  ));
