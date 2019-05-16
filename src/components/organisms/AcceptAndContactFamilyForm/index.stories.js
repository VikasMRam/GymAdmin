import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AcceptAndContactFamilyForm from 'sly/components/organisms/AcceptAndContactFamilyForm';

storiesOf('Organisms|AcceptAndContactFamilyForm', module)
  .add('default', () => <AcceptAndContactFamilyForm onCallClick={action('onCallClick')} onEmailClick={action('onEmailClick')} onCancelClick={action('onCancelClick')} />)
  .add('with no contact button click handlers', () => <AcceptAndContactFamilyForm onCancelClick={action('onCancelClick')} />);

