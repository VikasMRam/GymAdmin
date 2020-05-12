import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import Message from 'sly/web/components/molecules/Message';
import participant1 from 'sly/web/../private/storybook/sample-data/conversation-participant-1.json';
import message from 'sly/web/../private/storybook/sample-data/conversation-message-1.json';
import message6 from 'sly/web/../private/storybook/sample-data/conversation-message-6.json';

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
    expect(wrapper.find('StyledBox').find('PaddedBlock').contains(message.data.valueText)).toBeTruthy();
  });

  it('renders with buttonList type', () => {
    const wrapper = wrap({
      message: message6,
    });
    const buttonsWrapper = wrapper.find('ButtonsWrapper');

    expect(wrapper.find('StyledAvatar')).toHaveLength(1);
    expect(buttonsWrapper).toHaveLength(1);
    buttonsWrapper.forEach((bw, i) => {
      expect(bw.find('Button').contains(message6.data.valueButtonList.buttons[i].text)).toBeTruthy();
    });
  });

  it('renders without client', () => {
    const wrapper = wrap({
      participant: null,
    });

    expect(wrapper.find('StyledBox').find('TextAlignRightBlock').contains(dateString)).toBeTruthy();
    expect(wrapper.find('StyledAvatar')).toHaveLength(0);
    expect(wrapper.find('StyledBox').find('PaddedBlock').contains(message.data.valueText)).toBeTruthy();
  });
});
