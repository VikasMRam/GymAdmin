import React from 'react';
import { storiesOf } from '@storybook/react';

import ConversationMessages from 'sly/web/components/organisms/ConversationMessages';
import message1 from 'sly/web/../private/storybook/sample-data/conversation-message-1.json';
import message2 from 'sly/web/../private/storybook/sample-data/conversation-message-2.json';
import message3 from 'sly/web/../private/storybook/sample-data/conversation-message-3.json';
import message4 from 'sly/web/../private/storybook/sample-data/conversation-message-4.json';
import message5 from 'sly/web/../private/storybook/sample-data/conversation-message-5.json';
import participant1 from 'sly/web/../private/storybook/sample-data/conversation-participant-1.json';
import participant2 from 'sly/web/../private/storybook/sample-data/conversation-participant-2.json';
import PraneshKumar from 'sly/web/../private/storybook/sample-data/client-pranesh-kumar.json';
import AmalFrancis from 'sly/web/../private/storybook/sample-data/user-amal-francis.json';

const messages = [
  message1,
  message2,
  message3,
  message4,
  message5,
];

const participants = [
  participant1,
  participant2,
];

const participantClients = [
  PraneshKumar,
];

const participantUsers = [
  AmalFrancis,
];

storiesOf('Organisms|ConversationMessages', module)
  .add('default', () => (
    <ConversationMessages
      viewingAsParticipant={participants[0]}
      messages={messages}
      participants={participants}
      participantClients={participantClients}
      participantUsers={participantUsers}
    />
  ))
  .add('viewing as client', () => (
    <ConversationMessages
      viewingAsParticipant={participants[1]}
      messages={messages}
      participants={participants}
      participantClients={participantClients}
      participantUsers={participantUsers}
    />
  ));
