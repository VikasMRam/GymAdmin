import React from 'react';
import { shallow } from 'enzyme';

import Image from '.';

const wrap = (props = {}) => shallow(<Image {...props} />);

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const defaultAltSrc = 'Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const customAlt = 'this is a custom alt';
const notExistngsrc = '//d1qiigpe5txw4q.cloudfront.net/uploads/9e98a8d1b8d59941d725a30737861441/front%20of%20RGP%20building-4_hd.jpg';
const defaultAltNotExistingSrc = 'front of RGP building-4_hd.jpg';

describe('Image', () => {
  it('default', () => {
    const wrapper = wrap({ src });
    expect(wrapper).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty('src', src);
    expect(wrapper.props()).toHaveProperty('alt', defaultAltSrc);
  });

  it('sets alt', () => {
    const wrapper = wrap({ src, alt: customAlt });
    expect(wrapper.props()).toHaveProperty('alt', customAlt);
  });

  it('renders placeholder with default alt', () => {
    const wrapper = wrap({ src: notExistngsrc });
    expect(wrapper.props()).toHaveProperty('src', notExistngsrc);
    expect(wrapper.props()).toHaveProperty('alt', defaultAltNotExistingSrc);
  });

  it('renders placeholder with custom alt', () => {
    const wrapper = wrap({ src: notExistngsrc, alt: customAlt });
    expect(wrapper.props()).toHaveProperty('src', notExistngsrc);
    expect(wrapper.props()).toHaveProperty('alt', customAlt);
  });
});
