import React from 'react';
import { shallow } from 'enzyme';

import Badge from 'sly/components/atoms/Badge';

const wrap = (props = {}) => shallow(<Badge {...props} />);

const palette = 'slate';

describe('Badge', () => {
  it('renders with palette', () => {
    const wrapper = wrap({ palette });
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('renders with textPalette', () => {
    const wrapper = wrap({ textPalette: palette });
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
