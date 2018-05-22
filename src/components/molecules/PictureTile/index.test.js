import React from 'react';
import { shallow } from 'enzyme';
import PictureTile from '.';

const src =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_sd.jpg';

const wrap = (props = {}) => shallow(<PictureTile src={src} {...props} />);

describe('PictureTile', () => {
  it('renders Image', () => {
    const wrapper = wrap();
    expect(wrapper).toHaveLength(1);
  });
});
