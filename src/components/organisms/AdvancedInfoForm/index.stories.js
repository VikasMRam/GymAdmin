import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import AdvandedInfoForm from '.';

const user = {
  name: 'Ashley Clark',
};
const AdvandedInfoFormContainer = reduxForm({
  form: 'AdvandedInfoForm',
  destroyOnUnmount: false,
  initialValues: {
    type_of_care: [],
    type_of_room: [],
    time_to_move: [],
    budget: 5.5,
  },
})(AdvandedInfoForm);

storiesOf('Organisms|AdvancedInfoForm', module).add('default', () => (
  <AdvandedInfoFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
    community={RhodaGoldmanPlaza}
    user={user}
  />
));
