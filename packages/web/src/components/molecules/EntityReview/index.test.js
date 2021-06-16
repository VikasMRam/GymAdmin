import React from 'react';
import { shallow } from 'enzyme';

import EntityReview from 'sly/web/components/molecules/EntityReview';

const review = {
  value: 3.5,
  author: 'Pranesh',
  createdAt: '2018-04-20 00:00:00.00',
  comments: 'Best Community',
};
const wrap = (props = {}) => shallow(<EntityReview {...review} {...props} />);

describe('EntityReview', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders EntityReview', () => {
    const wrapper = wrap();
    expect(wrapper.find('Rating[value=3.5]')).toHaveLength(1);
    expect(wrapper.contains('Best Community')).toBeTruthy();
    expect(wrapper.contains('Pranesh')).toBeTruthy();
    expect(wrapper.contains('April 2018')).toBeTruthy();
  });
});
