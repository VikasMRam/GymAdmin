import React from 'react';
import { mount } from 'enzyme';

import Box from 'sly/components/atoms/Box';

const wrap = (props = {}) => mount(<Box {...props} />);
const palette = 'danger';

describe('Box', () => {
  it('renders with default palette', () => {
    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.props().palette).toBe(Box.defaultProps.palette);
  });

  it('renders with correct palette', () => {
    const wrapper = wrap({ palette });
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.props().palette).toBe(palette);
  });
});
