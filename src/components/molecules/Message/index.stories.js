import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from 'sly/components/molecules/Message';
import participant1 from 'sly/../private/storybook/sample-data/conversation-participant-1.json';
import message from 'sly/../private/storybook/sample-data/conversation-message-1.json';

storiesOf('Molecules|Message', module)
  .add('default', () => <Message participant={participant1} message={message} />)
  .add('without participant and dark', () => <Message dark message={message} />);
