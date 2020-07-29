import React from 'react';
import { shallow } from 'enzyme';

import Heading from '.';

const wrap = (props = {}) => shallow(<Heading {...props} />);

describe('Heading|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.dive().dive().dive().find('h2[id="foo"]')).toHaveLength(1);
  });

  it('renders h2 by default', () => {
    const wrapper = wrap();
    expect(wrapper.dive().dive().dive().find('h2')).toHaveLength(1);
  });

  it('renders h1 for hero', () => {
    const wrapper = wrap({ level: 'hero' });
    expect(wrapper.dive().dive().dive().find('h1')).toHaveLength(1);
  });

  it('renders hLevel when size is passed in', () => {
    const wrapper = wrap({ size: 'subtitle' });
    expect(wrapper.dive().dive().dive().find('h2')).toHaveLength(1);
  });
});
