import React from 'react';
import { storiesOf } from '@storybook/react';

import LatestMessage from 'sly/web/components/molecules/LatestMessage';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';
import message from 'sly/storybook/sample-data/conversation-message-1.json';

const { clientInfo } = PraneshKumar;
const { name } = clientInfo;

storiesOf('Molecules|LatestMessage', module)
  .add('default', () => <LatestMessage name={name} message={message} />)
  .add('with hasUnread', () => <LatestMessage hasUnread name={name} message={message} />)
  .add('with No message', () => <LatestMessage name={name} />);
