import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import LatestMessage from 'sly/components/molecules/LatestMessage';
import PraneshKumar from 'sly/../private/storybook/sample-data/client-pranesh-kumar.json';
import message from 'sly/../private/storybook/sample-data/message.json';

const dateString = dayjs(message.createdAt).format('MM/DD/YYYY');
const defaultProps = {
  message,
  client: PraneshKumar,
};
const wrap = (props = {}) => shallow(<LatestMessage {...defaultProps} {...props} />);

describe('LatestMessage', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('TopWrapper').find('Block').contains(dateString)).toBeTruthy();
    expect(wrapper.find('TopWrapper').find('ClampedText').contains(PraneshKumar.clientInfo.name)).toBeTruthy();
    expect(wrapper.find('ClampedText').contains(message.data.value)).toBeTruthy();
  });
});
