import React from 'react';
import { mount } from 'enzyme';

import { ResponsiveImage, Thumbnail } from 'sly/web/components/atoms';

const wrap = (props = {}) => mount(<Thumbnail {...props} />);

const path = '19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

describe('Thumbnail', () => {
  it('default', () => {
    const wrapper = wrap({ path });
    expect(wrapper.find(ResponsiveImage)).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty('path', path);
  });
});
