import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import EmailListItem from 'sly/web/components/molecules/EmailListItem';

const email = {
  from: 'Pranesh Kumar<pranesh@seniorly.com>',
  subject: 'Test Email',
  body: '<div>html body</div>',
  timestamp: '2018-04-20 00:00:00.00',
};

storiesOf('Molecules|EmailListItem', module).add('default', () => (<EmailListItem {...email} onClick={action('clicked')} />));
