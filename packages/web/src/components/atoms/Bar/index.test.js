import React from 'react';
import { shallow } from 'enzyme';

import Bar from 'sly/components/atoms/Bar';

const wrap = (props = {}) => shallow(<Bar {...props} />);

const width = 80;

describe('Bar', () => {
  it('renders with correct width', () => {
    const wrapper = wrap({ width });
    expect(wrapper.props()).toHaveProperty('width', width);
  });
});
