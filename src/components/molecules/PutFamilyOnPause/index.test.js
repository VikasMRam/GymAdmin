import React from 'react';
import { shallow } from 'enzyme';

import PutFamilyOnPause from 'sly/components/molecules/PutFamilyOnPause';

const wrap = (props = {}) => shallow(<PutFamilyOnPause {...props} />);

describe('PutFamilyOnPause', () => {
  it('renders', () => {
    const onTogglePause = jest.fn();
    const wrapper = wrap({
      onTogglePause,
    });

    expect(wrapper.find('Heading')).toHaveLength(1);
    expect(wrapper.find('Desc')).toHaveLength(1);
    expect(wrapper.find('IconButton').prop('palette')).toBe('grey');
    wrapper.find('IconButton').simulate('click');
    expect(onTogglePause).toHaveBeenCalled();
  });

  it('renders with isPaused', () => {
    const onTogglePause = jest.fn();
    const wrapper = wrap({
      onTogglePause,
      isPaused: true,
    });

    expect(wrapper.find('IconButton').prop('palette')).toBe('primary');
    wrapper.find('IconButton').simulate('click');
    expect(onTogglePause).toHaveBeenCalled();
  });
});
