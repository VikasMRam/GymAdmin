import React from 'react';
import { mount } from 'enzyme';

import Heading from '.';

const wrap = (props = {}) => mount(<Heading {...props} />);

describe('Heading|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test', size: 'subtitle' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo', size: 'subtitle' });
    expect(wrapper.find('h2[id="foo"]')).toBeTruthy();
  });

  // it('renders h1 by default', () => {
  //   const wrapper = wrap();
  //   expect(wrapper.find('h1')).toHaveLength(1);
  // });

  it('renders h1 for hero', () => {
    const wrapper = wrap({ size: 'hero' });
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('renders hLevel when size is passed in', () => {
    const wrapper = wrap({ size: 'subtitle' });
    expect(wrapper.find('h3')).toHaveLength(1);
  });
});
