import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunitySATContactForm from 'sly/components/organisms/CommunitySATContactForm';
import { withPreventDefault } from 'sly/services/helpers/forms';


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
    heading="How can we contact you about this community tour?"
    subheading="A local senior living advisor will help get you set up a tour with this community."
  />
)).add('Guest User', () => (
  <CommunitySATContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onAdvisorHelpClick={action('onAdvisorHelpClick')}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    onContactByTextMsgChange={action('onContactByTextMsgChange')}
    heading="Do you have any questions about this tour?"
    subheading="A local senior living advisor will help get you set up a tour with this community."
  />
)).add('Pricing Wizard', () => (
  <CommunitySATContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onAdvisorHelpClick={action('onAdvisorHelpClick')}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    onContactByTextMsgChange={action('onContactByTextMsgChange')}
    heading="How can we contact you about your pricing?"
    subheading="Your advisor will help get your custom pricing according to your care needs and room accomodations."
  />
));
