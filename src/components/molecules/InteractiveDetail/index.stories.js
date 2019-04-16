import React from 'react';
import { storiesOf } from '@storybook/react';

import InteractiveDetail from 'sly/components/molecules/InteractiveDetail';

storiesOf('Molecules|InteractiveDetail', module)
  .add('phone', () => (
    <InteractiveDetail label="Phone" detail={{ type: 'phone', value: '925-890-6575' }} />
  ))
  .add('email', () => (
    <InteractiveDetail label="Email" detail={{ type: 'email', value: 'test@test.com' }} />
  ));
