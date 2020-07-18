import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CreatePasswordForm from 'sly/web/services/auth/components/CreatePasswordForm/index';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const CreatePasswordFormContainer = reduxForm({
  form: 'CreatePasswordForm',
})(CreatePasswordForm);

storiesOf('Organisms|CreatePasswordForm', module)
  .add('default', () => (
    <CreatePasswordFormContainer
      handleSubmit={withPreventDefault(action('form submit'))}
      onDoThisLaterClick={action('onDoThisLaterClick')}
    />
  ));
