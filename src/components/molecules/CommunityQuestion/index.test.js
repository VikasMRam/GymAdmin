import React from 'react';
import { shallow } from 'enzyme';

import CommunityQuestion from 'sly/components/molecules/CommunityQuestion';

const question = {
  creator: 'Guest User',
  createdAt: '2016-08-24 04:35:15',
  type: 'Question',
  contentData: 'Do the apartments at AgeSong Hayes Valley Care have their own private bathrooms?',
};

const wrap = (props = {}) => shallow(<CommunityQuestion question={question} {...props} />);

describe('CommunityQuestion', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Community Question', () => {
    const wrapper = wrap();
    expect(wrapper.contains(question.contentData)).toBe(true);
  });
});
