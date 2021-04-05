import React from 'react';
import { shallow } from 'enzyme';

import Block from '.';

const wrap = (props = {}) => shallow(<Block {...props} />);

describe('Block|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });
});
