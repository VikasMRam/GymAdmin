import React from 'react';
import { shallow } from 'enzyme';
import PropertyReview from '.';

const review = {
  value: 3.5,
  author: 'Pranesh',
  createdAt: '2018-04-20 00:00:00.00',
  comments: 'Best Community',
};
const wrap = (props = {}) => shallow(<PropertyReview {...review} {...props} />);

describe('PropertyReview', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap();
    expect(wrapper.childAt(1).contains('Best Community')).toBe(true);
    expect(wrapper
      .childAt(0)
      .childAt(1)
      .dive()
      .text()).toEqual('By Pranesh');
    expect(wrapper
      .childAt(0)
      .childAt(2)
      .dive()
      .text()).toEqual('Apr 20, 2018');
    expect(wrapper.find('Rating[value=3.5]')).toHaveLength(1);
  });
});
