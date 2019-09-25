import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import AddFamilyForm from 'sly/components/organisms/AddFamilyForm';

const timeToMove = [
  'Immediately',
  '1-3 Months',
  '3 Months+',
];

const lookingFor = [
  'Self',
  'Parents',
  'Mother',
  'Father',
  'Grandparents',
  'Grandmother',
  'Grandfather',
  'Husband',
  'Wife',
  'Other',
];

const AddFamilyFormContainer = reduxForm({
  form: 'AddFamilyForm',
})(AddFamilyForm);

storiesOf('Organisms|AddFamilyForm', module)
  .add('default', () => <AddFamilyFormContainer lookingFor={lookingFor} timeToMove={timeToMove} />);
