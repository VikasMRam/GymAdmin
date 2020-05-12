import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import FamilyDetailsForm from 'sly/web/components/organisms/FamilyDetailsForm';
import AmalFrancis from 'sly/web/../private/storybook/sample-data/user-amal-francis.json';
import SushanthRamakrishna from 'sly/web/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const timeToMove = [
  'Immediately',
  '1-3 Months',
  '3 Months+',
];

const gender = [
  'Male',
  'Female',
  'Other',
  'Not Specified',
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

const monthlyBudget = [
  '<$2K',
  '$2K-$3K',
  '$3K-$4K',
  '$4K-$5K',
  '$5K+',
];

const assignedTos = [
  AmalFrancis,
  SushanthRamakrishna,
];

const FamilyDetailsFormContainer = reduxForm({
  form: 'FamilyDetailsForm',
})(FamilyDetailsForm);

storiesOf('Organisms|FamilyDetailsForm', module)
  .add('default', () => <FamilyDetailsFormContainer monthlyBudget={monthlyBudget} lookingFor={lookingFor} gender={gender} timeToMove={timeToMove} assignedTos={assignedTos} />)
  .add('accepted', () => <FamilyDetailsFormContainer accepted monthlyBudget={monthlyBudget} lookingFor={lookingFor} gender={gender} timeToMove={timeToMove} assignedTos={assignedTos} />);
