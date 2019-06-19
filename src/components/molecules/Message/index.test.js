import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import Message from 'sly/components/molecules/Message';
import participant1 from 'sly/../private/storybook/sample-data/conversation-participant-1.json';
import message from 'sly/../private/storybook/sample-data/conversation-message-1.json';

const dateString = dayjs(message.createdAt).format('h:mm A');
const defaultProps = {
  message,
  participant: participant1,
};
const wrap = (props = {}) => shallow(<Message {...defaultProps} {...props} />);

describe('Message', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledBox').find('Block').contains(dateString)).toBeTruthy();
    expect(wrapper.find('StyledAvatar')).toHaveLength(1);
    expect(wrapper.find('StyledBox').find('PaddedBlock').contains(message.data.value)).toBeTruthy();
  });

  it('renders without client', () => {
    const wrapper = wrap({
      participant: null,
    });

    expect(wrapper.find('StyledBox').find('TextAlignRightBlock').contains(dateString)).toBeTruthy();
    expect(wrapper.find('StyledAvatar')).toHaveLength(0);
    expect(wrapper.find('StyledBox').find('PaddedBlock').contains(message.data.value)).toBeTruthy();
  });
});
