import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import PartnerAgentLoginForm from 'sly/services/auth/components/PartnerAgentLoginForm/index';
import { withPreventDefault } from 'sly/services/helpers/forms';

const PartnerAgentLoginFormContainer = reduxForm({
  form: 'PartnerAgentLoginForm',
})(PartnerAgentLoginForm);

storiesOf('Organisms|PartnerAgentLoginForm', module)
  .add('default', () => (
    <PartnerAgentLoginFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onResetPasswordClick={action('reset password clicked')}
      onRegisterClick={action('register clicked')}
    />
  ));
