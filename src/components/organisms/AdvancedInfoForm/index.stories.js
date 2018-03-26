import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';
import AdvandedInfoForm from '.';

const AdvandedInfoFormContainer = reduxForm({
  form: 'AdvandedInfoForm',
  values: {
    type_of_care: [],
  },
})(AdvandedInfoForm);

const community = {
  name: 'Rhoda Goldman Plaza',
};

const user = {
  name: 'Ashley Clark',
};

storiesOf('Organisms|AdvancedInfoForm', module).add('default', () => (
  <AdvandedInfoFormContainer handleSubmit={action('submit!')} community={community} user={user} />
));

