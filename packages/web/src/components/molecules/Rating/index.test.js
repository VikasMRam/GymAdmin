import React from 'react';
import { mount } from 'enzyme';

import Rating from 'sly/web/components/molecules/Rating';

const wrap = (props = {}) => mount(<Rating {...props} />);

describe('Rating', () => {
  it('should render ratings', () => {
    const wrapper = wrap({ value: 3.3 });

    const icon = wrapper.find('svg');
    expect(icon.find('path')).toHaveLength(6);

    const  mask = icon.find('mask');
    expect(mask).toHaveLength(1);
    expect(mask.find('rect')).toHaveLength(2);
    expect(mask.find('rect').at(0).prop('fill')).toBe('white');
    expect(mask.find('rect').at(1).prop('x')).toBe(8);
    expect(mask.find('rect').at(1).prop('fill')).toBe('black');
  });
});

