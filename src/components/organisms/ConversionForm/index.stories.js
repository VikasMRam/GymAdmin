import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';
import ConversionForm from '.';

const ConversionFormContainer = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
})(ConversionForm);

storiesOf('Organisms|ConversionForm', module).add('default', () => (
  <ConversionFormContainer
    handleSubmit={action('facebook')}
    submittin={false}
  />
));
