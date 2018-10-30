import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Notifications from '.';

const messages = [
  {
    content: 'hello world',
    type: 'default',
  },
  {
    content: 'an error occured',
    type: 'error',
  },
];

storiesOf('Organisms|Notifications', module)
  .add('default', () => (
    <Notifications messages={messages} dismiss={action('closed')} />
  ));
