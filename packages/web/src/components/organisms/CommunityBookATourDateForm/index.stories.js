import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import CommunityBookATourDateForm from 'sly/web/components/organisms/CommunityBookATourDateForm';

const CommunityBookATourDateFormContainer = reduxForm({
  form: 'CommunityBookATourDateForm',
  destroyOnUnmount: false,
  initialValues: {
    date: '',
    time: '',
  },
})(CommunityBookATourDateForm);

storiesOf('Organisms|CommunityBookATourDateForm', module)
  .add('default', () => (
    <CommunityBookATourDateFormContainer onDateChange={action('date changed')} onTimeChange={action('time changed')} />
  ))
  .add('with medicaidCoverage', () => (
    <CommunityBookATourDateFormContainer userDetails={{ medicaidCoverage: 'no' }} onDateChange={action('date changed')} onTimeChange={action('time changed')} />
  ));

