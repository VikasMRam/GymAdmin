import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import CommunitySATContactForm from '.';

const CommunitySATContactFormContainer = reduxForm({
  form: 'CommunitySATContactForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
})(CommunitySATContactForm);

const user = {
  id: 1,
  name: 'Pranesh Kumar',
};

storiesOf('Organisms|CommunitySATContactForm', module).add('default', () => (
  <CommunitySATContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onAdvisorHelpClick={action('onAdvisorHelpClick')}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    user={user}
  />
)).add('Guest User', () => (
  <CommunitySATContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onAdvisorHelpClick={action('onAdvisorHelpClick')}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
  />
));
