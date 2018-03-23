import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';
import AdvandedInfoForm from '.';

const AdvandedInfoFormContainer = reduxForm({
  form: 'AdvandedInfoForm',
  destroyOnUnmount: false,
})(AdvandedInfoForm);

storiesOf('Organisms|AdvancedInfoForm', module).add('default', () => (
  <AdvandedInfoFormContainer
    handleSubmit={action('facebook')}
    submittin={false}
  />
));
