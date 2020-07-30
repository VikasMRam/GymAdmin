import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ConfirmReasonForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ConfirmReasonFormContainer = reduxForm({
  form: 'PlaceFamilyOnPauseForm',
})(ConfirmReasonForm);

storiesOf('Organisms|PlaceFamilyOnPauseForm', module)
  .add('default', () => (
    <ConfirmReasonFormContainer
      name="test"
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
    />
  ));
