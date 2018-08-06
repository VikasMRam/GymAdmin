import React from 'react';
import { shallow } from 'enzyme';

import { assetPath } from 'sly/components/themes';
import DiscoverTile, { ImageWrapper } from '.';

const content = {
  heading: 'Families',
  subHeading: 'Find an assisted living community to love from our thousands of listings',
  imageUrl: assetPath('images/how-it-works/discover-1.png'),
};

const wrap = (props = {}) => shallow(<DiscoverTile content={content} {...props} />);

describe('DiscoverTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders DiscoverTile', () => {
    const wrapper = wrap();
    expect(wrapper.contains(content.heading)).toEqual(true);
    expect(wrapper.contains(content.subHeading)).toEqual(true);
    expect(wrapper.find(ImageWrapper).prop('src')).toEqual(content.imageUrl);
  });
});
