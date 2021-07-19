import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import ContactUsForm from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ContactUsFormContainer = reduxForm({
  form: 'ContactUsForm',
})(ContactUsForm);

storiesOf('Common|Web/Components/ContactUsForm', module)
  .add('default', () => (
    <ContactUsFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
