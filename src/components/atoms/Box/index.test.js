import React from 'react';
import { shallow } from 'enzyme';

import Box from '.';

const wrap = (props = {}) => shallow(<Box {...props} />);

const palette = 'slate';

describe('Box', () => {
  it('renders with default palette', () => {
    const wrapper = wrap();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.instance().props.palette).toBe(Box.defaultProps.palette);
  });

  it('renders with correct palette', () => {
    const wrapper = wrap({ palette });
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.instance().props.palette).toBe(palette);
  });
});
