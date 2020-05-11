import React from 'react';
import { shallow } from 'enzyme';
import EmailListItem from 'sly/components/molecules/EmailListItem';

const email = {
  from: 'Pranesh Kumar<pranesh@seniorly.com>',
  subject: 'Test Email',
  body: '<div>html body</div>',
  timestamp: '2018-04-20 00:00:00.00'
};
const wrap = (props = {}) => shallow(<EmailListItem {...email} {...props} />);

describe('EmailListItem', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders EmailListItem', () => {
    const wrapper = wrap();
    expect(wrapper.contains('Pranesh Kumar<pranesh@seniorly.com>')).toBeTruthy();
    expect(wrapper.contains('Test Email')).toBeTruthy();
    // expect(wrapper.contains('html body')).toBeTruthy();
    expect(wrapper.contains('2018-04-20 00:00:00.00')).toBeTruthy();
  });

  it('handles onClick', () => {
    const onClick = jest.fn();
    const wrapper = wrap({ onClick });

    expect(onClick).toHaveBeenCalledTimes(0);
    wrapper.find('Wrapper').simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
