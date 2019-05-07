import React from 'react';
import { shallow } from 'enzyme';

import Tab from 'sly/components/atoms/Tab';

const onClick = jest.fn();
const defaultProp = {
  active: false, label: 'blah', onClick,
};
const wrap = (props = {}) => shallow(<Tab {...defaultProp} {...props} />);


describe('Tab', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders active tab', () => {
    const wrapper = wrap({ active: true, label: 'Foo' });
    expect(wrapper.contains('Foo')).toBe(true);
  });

  it('handles onClick', () => {
    const wrapper = wrap({ });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
