import React from 'react';
import { shallow } from 'enzyme';

import Badge from '.';

const wrap = (props = {}) => shallow(<Badge {...props} />);

describe('Badge|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });
});
