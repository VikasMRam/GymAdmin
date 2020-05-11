import React from 'react';
import { shallow } from 'enzyme';

import ConversationMessages from 'sly/components/organisms/ConversationMessages';
import message1 from 'sly/../private/storybook/sample-data/conversation-message-1.json';
import message2 from 'sly/../private/storybook/sample-data/conversation-message-2.json';
import message3 from 'sly/../private/storybook/sample-data/conversation-message-3.json';
import message4 from 'sly/../private/storybook/sample-data/conversation-message-4.json';
import message5 from 'sly/../private/storybook/sample-data/conversation-message-5.json';
import participant1 from 'sly/../private/storybook/sample-data/conversation-participant-1.json';
import participant2 from 'sly/../private/storybook/sample-data/conversation-participant-2.json';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';
import AmalFrancis from 'sly/../private/storybook/sample-data/user-amal-francis.json';

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

const participantProfiles = [
  PraneshKumar,
  AmalFrancis,
];

const dateHrs = [
  'Tuesday, May 1st, 2018',
  'Wednesday, May 1st, 2019',
  'Monday, April 1st, 2019',
];

const defaultProps = {
  viewingAsParticipant: participants[0],
  messages,
  participants,
  participantProfiles,
};
const wrap = (props = {}) => shallow(<ConversationMessages {...defaultProps} {...props} />);

describe('ConversationMessages', () => {
  it('renders', () => {
    const wrapper = wrap();
    const renderedMessages = wrapper.find('StyledMessage');
    const renderedHrs = wrapper.find('PaddedHrWithText');

    expect(renderedMessages).toHaveLength(messages.length);
    renderedMessages.forEach((m, i) => {
      expect(m.prop('message').id).toBe(messages[messages.length - 1 - i].id);
    });
    expect(renderedHrs).toHaveLength(dateHrs.length);
    renderedHrs.forEach((hr, i) => {
      expect(hr.prop('text')).toBe(dateHrs[i]);
    });
  });
});
