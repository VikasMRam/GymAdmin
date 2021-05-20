import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CreatePasswordForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const CreatePasswordFormContainer = reduxForm({
  form: 'CreatePasswordForm',
})(CreatePasswordForm);

storiesOf('Common|Services/Auth/CreatePasswordForm', module)
  .add('default', () => (
    <CreatePasswordFormContainer
      handleSubmit={withPreventDefault(action('form submit'))}
      onDoThisLaterClick={action('onDoThisLaterClick')}
    />
  ));
