import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import AgentSignupForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const AgentSignupFormContainer = reduxForm({
  form: 'AgentSignupForm',
})(AgentSignupForm);

storiesOf('Common|Services/Auth/AgentSignupForm', module)
  .add('default', () => (
    <AgentSignupFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onLoginClicked={withPreventDefault(action('login clicked'))}
    />
  ));
