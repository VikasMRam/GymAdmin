import React from 'react';
import { shallow } from 'enzyme';

import Footer from '.';

const wrap = (props = {}) => shallow(<Footer {...props} />);

describe('Footer', () => {
  it('does not renders children when passed in', () => {
    // const wrapper = wrap({ children: 'test' });
    // expect(wrapper.contains('test')).toBe(false);
  });
});
