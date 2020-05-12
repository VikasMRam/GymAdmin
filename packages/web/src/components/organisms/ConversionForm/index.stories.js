import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ConversionForm from 'sly/components/organisms/ConversionForm';
import { createValidator, email, usPhone, required } from 'sly/services/validation';

export const validate = createValidator({
  full_name: [required],
  email: [email, required],
  phone: [usPhone, required],
});

const ConversionFormContainer = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
  validate,
})(ConversionForm);

storiesOf('Organisms|ConversionForm', module).add('default', () => (
  <ConversionFormContainer
    handleSubmit={action('facebook')}
    submittin={false}
  />
));

