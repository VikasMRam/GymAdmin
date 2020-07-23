import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import CommunityBookATourContactForm from 'sly/web/components/organisms/CommunityBookATourContactForm';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

const CommunityBookATourContactFormContainer = reduxForm({
  form: 'CommunityBookATourContactForm',
  destroyOnUnmount: false,
  initialValues: {
    question: '',
  },
})(CommunityBookATourContactForm);

const user = {
  id: 1,
  name: 'Pranesh Kumar',
};

const userDetails = {
  fullName: 'Pranesh Kumar',
  phone: '8792463635',
  contactByTextMsg: 'yes',
};

storiesOf('Organisms|CommunityBookATourContactForm', module).add('default', () => (
  <CommunityBookATourContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    user={user}
    heading="How can we contact you about this community tour?"
  />
)).add('Guest User', () => (
  <CommunityBookATourContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    onContactByTextMsgChange={action('onContactByTextMsgChange')}
    heading="Do you have any questions about this tour?"
  />
)).add('Guest User with User Details', () => (
  <CommunityBookATourContactFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    onMedicaidHelpClick={action('onMedicaidHelpClick')}
    onContactByTextMsgChange={action('onContactByTextMsgChange')}
    heading="Do you have any questions about this tour?"
    userDetails={userDetails}
  />
))
  .add('Pricing Wizard', () => (
    <CommunityBookATourContactFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onMedicaidHelpClick={action('onMedicaidHelpClick')}
      onContactByTextMsgChange={action('onContactByTextMsgChange')}
      heading="How can we contact you about your pricing?"
    />
  ));
