import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ResetPasswordForm from 'sly/components/organisms/ResetPasswordForm';
import { withPreventDefault } from 'sly/services/helpers/forms';


const ResetPasswordFormContainer = reduxForm({
  form: 'ResetPasswordForm',
  destroyOnUnmount: false,
})(ResetPasswordForm);

storiesOf('Organisms|ResetPasswordForm', module)
  .add('default', () => (
    <ResetPasswordFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSignupClicked={withPreventDefault(action('sign up clicked'))}
    />
  ));
