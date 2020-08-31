import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ProviderSignupForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ProviderSignupFormContainer = reduxForm({
  form: 'ProviderSignupForm',
})(ProviderSignupForm);

storiesOf('Common|Services/Auth/ProviderSignupForm', module)
  .add('default', () => (
    <ProviderSignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
    />
  ));
