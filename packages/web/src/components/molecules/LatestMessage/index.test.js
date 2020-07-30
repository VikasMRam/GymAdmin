import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import LatestMessage from 'sly/web/components/molecules/LatestMessage';
import PraneshKumar from 'sly/storybook/sample-data/client-pranesh-kumar.json';
import message from 'sly/storybook/sample-data/conversation-message-1.json';

const dateString = dayjs(message.createdAt).format('MM/DD/YYYY');
const defaultProps = {
  name: PraneshKumar.clientInfo.name,
};
const wrap = (props = {}) => shallow(<LatestMessage {...defaultProps} {...props} />);

describe('LatestMessage', () => {
  it('renders', () => {
    const wrapper = wrap({ message });
    expect(wrapper.find('TopWrapper').find('Block').contains(dateString)).toBeTruthy();
    expect(wrapper.find('TopWrapper').find('ClampedText').contains(PraneshKumar.clientInfo.name)).toBeTruthy();
    expect(wrapper.find('ClampedText').contains(message.data.valueText)).toBeTruthy();
  });

  it('invalid date', () => {
    const newMessage = { ...message, createdAt: 'blah' };
    const wrapper = wrap({ message: newMessage, name: PraneshKumar.clientInfo.name });
    expect(wrapper.find('TopWrapper').find('Block').contains('Failed to parse date')).toBeTruthy();
    expect(wrapper.find('TopWrapper').find('ClampedText').contains(PraneshKumar.clientInfo.name)).toBeTruthy();
    expect(wrapper.find('ClampedText').contains(message.data.valueText)).toBeTruthy();
  });

  it('no message', () => {
    const { name } = PraneshKumar.clientInfo;
    const wrapper = wrap({ name });
    expect(wrapper.find('TopWrapper').find('ClampedText').contains(PraneshKumar.clientInfo.name)).toBeTruthy();
    expect(wrapper.find('ClampedText').contains(`This is the beginning of your conversation with ${name}`)).toBeTruthy();
  });

  it('handles onClick', () => {
    const onClick = jest.fn();
    const wrapper = wrap({ onClick });
    expect(onClick).toHaveBeenCalledTimes(0);
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
