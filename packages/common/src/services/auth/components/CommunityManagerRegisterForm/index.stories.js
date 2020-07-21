import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityManagerRegisterForm from './';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const CommunityManagerRegisterFormContainer = reduxForm({
  form: 'CommunityManagerRegisterForm',
})(CommunityManagerRegisterForm);

storiesOf('Organisms|CommunityManagerRegisterForm', module)
  .add('default', () => (
    <CommunityManagerRegisterFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSignupClick={action('sign up clicked')}
      onFacebookSigninClick={action('facebook login clicked')}
      onGoogleSigninClick={action('google login clicked')}
      onEmailPassLoginClick={action('partner agent login clicked')}
    />
  ));
