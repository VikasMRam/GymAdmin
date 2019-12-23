import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';
import { withPreventDefault } from 'sly/services/helpers/forms';
import clients from 'sly/../private/storybook/sample-data/clients.json';

const DuplicateFamiliesContainer = reduxForm({
  form: 'DuplicateFamilies',
})(DuplicateFamilies);

storiesOf('Organisms|DuplicateFamilies', module)
  .add('default', () => <DuplicateFamiliesContainer handleSubmit={withPreventDefault(action('onAddFamily'))} currentClient={clients[0]} clients={clients} />);
