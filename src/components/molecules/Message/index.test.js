import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import Message from 'sly/components/molecules/Message';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';
import message from 'sly/../private/storybook/sample-data/message.json';

const dateString = dayjs(message.createdAt).format('h:mm A');
const defaultProps = {
  message,
  client: PraneshKumar,
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
      client: null,
    });

    expect(wrapper.find('StyledBox').find('TextAlignRightBlock').contains(dateString)).toBeTruthy();
    expect(wrapper.find('StyledAvatar')).toHaveLength(0);
    expect(wrapper.find('StyledBox').find('PaddedBlock').contains(message.data.value)).toBeTruthy();
  });
});
