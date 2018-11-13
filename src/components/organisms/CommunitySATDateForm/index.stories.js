import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import CommunitySATDateForm from 'sly/components/organisms/CommunitySATDateForm';

const CommunitySATDateFormContainer = reduxForm({
  form: 'CommunitySATDateForm',
  destroyOnUnmount: false,
  initialValues: {
    date: '',
    time: '',
  },
})(CommunitySATDateForm);

storiesOf('Organisms|CommunitySATDateForm', module)
  .add('default', () => (
    <CommunitySATDateFormContainer />
  ));
