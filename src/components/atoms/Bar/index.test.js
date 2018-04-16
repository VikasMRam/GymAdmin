import React from 'react';
import { shallow } from 'enzyme';

import Bar from '.';

const wrap = (props = {}) => shallow(<Bar {...props} />);

const width = 80;

describe('Bar', () => {
  it('renders with correct width', () => {
    const wrapper = wrap({ width });
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').props()).toHaveProperty('width', width);
  });
});
