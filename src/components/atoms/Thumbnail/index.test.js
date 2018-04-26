import React from 'react';
import { shallow } from 'enzyme';

import Thumbnail from '.';
import { Image } from 'sly/components/atoms';

const wrap = (props = {}) => shallow(<Thumbnail {...props} />).dive();

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';

describe('Thumbnail', () => {
  it('default', () => {
    const wrapper = wrap({ src });
    expect(wrapper.find(Image)).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty('src', src);
  });
});
