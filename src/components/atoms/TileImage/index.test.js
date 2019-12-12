import React from 'react';
import { mount } from 'enzyme';

import TileImage from '.';

const wrap = (props = {}) => mount(<TileImage {...props} />);

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const tileSize = 'regular';

describe('TileImage', () => {
  it('renders with default tileSize', () => {
    const wrapper = wrap({ src });
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.props().tileSize).toBe(TileImage.defaultProps.tileSize);
  });

  it('renders with passed tileSize', () => {
    const wrapper = wrap({ src, tileSize });
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.props().tileSize).toBe(tileSize);
  });

  it('renders with src', () => {
    const wrapper = wrap({ src });
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty('src', src);
  });
});
