import React from 'react';
import { shallow } from 'enzyme';

import Tab from 'sly/web/components/molecules/Tab';

const onClick = jest.fn();
const defaultProp = {
  active: false, label: 'blah', onClick,
};
const wrap = (props = {}) => shallow(<Tab {...defaultProp} {...props} />);


describe('Tab', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders active tab', () => {
    const wrapper = wrap({ active: true, children: 'Foo' });
    expect(wrapper.contains('Foo')).toBe(true);
  });

  it('handles onClick', () => {
    const wrapper = wrap({ children: 'Blah' });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
