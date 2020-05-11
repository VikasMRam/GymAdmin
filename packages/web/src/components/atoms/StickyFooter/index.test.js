import React from 'react';
import { shallow } from 'enzyme';

import StickyFooter from 'sly/components/atoms/StickyFooter';

const wrap = (props = {}) => shallow(<StickyFooter {...props} />);

describe('StickyFooter', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });
});
