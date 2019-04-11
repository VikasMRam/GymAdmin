import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import FamilyDetailsForm from 'sly/components/organisms/FamilyDetailsForm';

const FamilyDetailsFormContainer = reduxForm({
  form: 'FamilyDetailsForm',
})(FamilyDetailsForm);

storiesOf('Organisms|FamilyDetailsForm', module)
  .add('default', () => <FamilyDetailsFormContainer />)
  .add('accepted', () => <FamilyDetailsFormContainer accepted />);
