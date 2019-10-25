import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import EbookForm from './index';

import { withPreventDefault } from 'sly/services/helpers/forms';

const EbookFormContainer = reduxForm({
  form: 'EbookForm',
  destroyOnUnmount: false,
})(EbookForm);

storiesOf('Organisms|EbookForm', module)
  .add('default', () => (
    <EbookFormContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
