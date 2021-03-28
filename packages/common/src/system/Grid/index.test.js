import React from 'react';
import { shallow } from 'enzyme';

import Grid from '.';

const wrap = (props = {}, context) => shallow(<Grid {...props} />, context);

describe('Grid|Web', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });
});
