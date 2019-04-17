import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';
import RejectFamilyForm from 'sly/components/organisms/RejectFamilyForm';

const reasons = [
  'reason 1',
  'reason 2',
];
const RejectFamilyFormContainer = reduxForm({
  form: 'RejectFamilyForm',
  destroyOnUnmount: false,
})(RejectFamilyForm);

storiesOf('Organisms|RejectFamilyForm', module)
  .add('default', () => (
    <RejectFamilyFormContainer
      handleSubmit={withPreventDefault(action('onSubmit'))}
      onCancel={action('onCancel')}
      reasons={reasons}
    />
  ));
