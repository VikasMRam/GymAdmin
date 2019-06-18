import React from 'react';
import { storiesOf } from '@storybook/react';

import Message from 'sly/components/molecules/Message';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';
import AmalFrancis from 'sly/../private/storybook/sample-data/user-amal-francis.json';
import message from 'sly/../private/storybook/sample-data/conversation-message-1.json';

storiesOf('Molecules|Message', module)
  .add('default', () => <Message client={PraneshKumar} message={message} />)
  .add('without client', () => <Message message={message} />)
  .add('with user', () => <Message message={message} user={AmalFrancis} />)
  .add('without client and dark', () => <Message dark message={message} />);
