import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

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
    <CommunitySATDateFormContainer onDateChange={action('date changed')} onTimeChange={action('time changed')} />
  ))
  .add('with medicaidCoverage', () => (
    <CommunitySATDateFormContainer userDetails={{ medicaidCoverage: 'no' }} onDateChange={action('date changed')} onTimeChange={action('time changed')} />
  ));

