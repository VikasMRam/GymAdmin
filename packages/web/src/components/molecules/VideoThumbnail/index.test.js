import React from 'react';
import { shallow } from 'enzyme';

import VideoThumbnail from 'sly/components/molecules/VideoThumbnail';

const src = '//d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg';
const wrap = (props = {}) => shallow(<VideoThumbnail src={src} {...props} />);

describe('VideoThumbnail', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Icon').prop('icon')).toEqual('play');
    expect(wrapper.find('StyledImage').prop('src')).toEqual(src);
  });

  it('onClick get called', () => {
    const onClick = jest.fn();
    const wrapper = wrap({ onClick });

    wrapper.find('CenterContent').simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
