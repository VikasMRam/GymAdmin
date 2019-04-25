import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AcceptFamilyContactDetails from 'sly/components/organisms/AcceptFamilyContactDetails';

storiesOf('Organisms|AcceptFamilyContactDetails', module)
  .add('phone', () => <AcceptFamilyContactDetails label="Phone" detail={{ type: 'phone', value: '925-890-6575' }} handleSubmit={action('onSubmit')} />)
  .add('email', () => <AcceptFamilyContactDetails label="Email" detail={{ type: 'email', value: 'test@test.com' }} handleSubmit={action('onSubmit')} />);
