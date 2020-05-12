import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from 'sly/web/components/molecules/Message';
import participant1 from 'sly/web/../private/storybook/sample-data/conversation-participant-1.json';
import message from 'sly/web/../private/storybook/sample-data/conversation-message-1.json';
import message6 from 'sly/web/../private/storybook/sample-data/conversation-message-6.json';

storiesOf('Molecules|Message', module)
  .add('default', () => <Message participant={participant1} message={message} />)
  .add('with buttonList type', () => <Message participant={participant1} message={message6} />)
  .add('without participant and dark', () => <Message dark message={message} />);
