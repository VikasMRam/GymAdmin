import React from 'react';
import { shallow } from 'enzyme';

import { assetPath } from 'sly/components/themes';
import DiscoverTile, { ImageWrapper } from '.';

const content = {
  badgeName: 'Families',
  badgeText: 'Find an assisted living community to love from our thousands of listings',
  badgeImageUrl: assetPath('images/how-it-works/discover-1.png'),
};

const wrap = (props = {}) => shallow(<DiscoverTile content={content} {...props} />);

describe('DiscoverTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders DiscoverTile', () => {
    const wrapper = wrap();
    expect(wrapper.contains(content.badgeName)).toEqual(true);
    expect(wrapper.contains(content.badgeText)).toEqual(true);
    expect(wrapper.find(ImageWrapper).prop('src')).toEqual(content.badgeImageUrl);
  });
});
