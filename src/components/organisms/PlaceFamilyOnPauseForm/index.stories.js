import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';
import PlaceFamilyOnPauseForm from 'sly/components/organisms/PlaceFamilyOnPauseForm';

const PlaceFamilyOnPauseFormContainer = reduxForm({
  form: 'PlaceFamilyOnPauseForm',
})(PlaceFamilyOnPauseForm);

storiesOf('Organisms|PlaceFamilyOnPauseForm', module)
  .add('default', () => (
    <PlaceFamilyOnPauseFormContainer
      name="test"
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
    />
  ));
