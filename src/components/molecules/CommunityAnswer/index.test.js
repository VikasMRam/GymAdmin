import React from 'react';
import { shallow } from 'enzyme';

import { formatDate } from 'sly/services/helpers/date';
import CommunityAnswer from '.';

const answer = {
  creator: 'The Seniorly Team',
  createdAt: '2016-11-30 20:23:35',
  contentData: 'Yes pricing does include both cable and wifi.',
};

const wrap = (props = {}) => shallow(<CommunityAnswer answer={answer} {...props} />);

describe('CommunityAnswer', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Community Answer', () => {
    const wrapper = wrap().dive();
    expect(wrapper.contains(answer.creator)).toBe(true);
    expect(wrapper.contains(formatDate(answer.createdAt))).toBe(true);
    expect(wrapper.contains(answer.contentData)).toBe(true);
  });
});
