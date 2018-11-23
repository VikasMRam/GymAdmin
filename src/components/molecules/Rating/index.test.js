import React from 'react';
import { shallow } from 'enzyme';

import Icon from 'sly/components/atoms/Icon';
import Rating, { PositionedMask } from 'sly/components/molecules/Rating';

const wrap = (props = {}) => shallow(<Rating {...props} />);

describe('Rating', () => {
  it('should render ratings', () => {
    const wrapper = wrap({ value: 3.5 });

    const icons = wrapper.find(Icon);
    expect(icons).toHaveLength(5);
    const masks = wrapper.find(PositionedMask);
    expect(masks).toHaveLength(5);

    masks.forEach((mask, i) => {
      let expected = 0;
      if (i < 3) {
        expected = 100;
      } else if (i < 4) {
        expected = 50;
      }
      expect(mask.prop('width')).toEqual(expected);
    });
  });
});

