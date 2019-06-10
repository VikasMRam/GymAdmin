import React from 'react';
import { storiesOf } from '@storybook/react';

import LatestMessage from 'sly/components/molecules/LatestMessage';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';
import message from 'sly/../private/storybook/sample-data/message.json';

storiesOf('Molecules|LatestMessage', module)
  .add('default', () => <LatestMessage client={PraneshKumar} message={message} />)
  .add('with hasUnread', () => <LatestMessage hasUnread client={PraneshKumar} message={message} />);
