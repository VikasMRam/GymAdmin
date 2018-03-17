import React from 'react';
import { shallow } from 'enzyme';

import Rating from '.';
import Icon from 'sly/components/atoms/Icon';

const wrap = (props = {}) => shallow(<Rating {...props} />);
const wrapIcon = (props = {}) => shallow(<Icon icon="star-clip" {...props} />);

describe('Rating', () => {
  it('should render ratings', () => {
    const wrapper = wrap({ value: 3.5 });
    const icons = wrapper.find('Icon');
    expect(icons).toHaveLength(5);
    icons.forEach((icon, i) => {
      const expected = i < 3 ? '100%' : i < 4 ? '50%' : '0%';
      expect(icon.prop('transform')('%WIDTH%')).toEqual(expected);
    });
  });

  it('should render star-clip icon', () => {
    const transform = jest.fn();
    const wrapper = wrapIcon({ transform });
    expect(transform).toHaveBeenCalledWith({ default: 'file' });
  });
});
