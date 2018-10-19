import React from 'react';
import { shallow } from 'enzyme';

import { Link} from 'sly/components/atoms';

import SavedCommunityTile from '.';

const savedCommunity = {
  imageUrl: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/db8f52dcc7f603607d0ff91c68328b73/VM-5668_sm_sd.jpg',
  name: 'Victorian Manor',
  note: 'test note',
  url: 'http://www.lvh.me/assisted-living/california/san-francisco/victorian-manor',
};
const onFavouriteClickedSpy = jest.fn();

const wrap = (props = {}) =>
  shallow(<SavedCommunityTile {...props} />);

describe('SavedCommunityTile', () => {
  it('renders with note', () => {
    const wrapper = wrap({
      image: savedCommunity.imageUrl,
      name: savedCommunity.name,
      note: savedCommunity.note,
      url: savedCommunity.url,
    });
    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).contains(savedCommunity.name)).toBe(true);
    expect(wrapper.find('Note')).toHaveLength(1);
    expect(wrapper.find('Note').dive().text()).toContain(savedCommunity.note);
  });

  it('renders without note', () => {
    const wrapper = wrap({
      image: savedCommunity.imageUrl,
      name: savedCommunity.name,
      url: savedCommunity.url,
    });
    expect(wrapper.find('StyledIcon')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).contains(savedCommunity.name)).toBe(true);
    expect(wrapper.find('Note')).toHaveLength(0);
  });

  it('verify onFavouriteClicked callback', () => {
    const wrapper = wrap({
      image: savedCommunity.imageUrl,
      name: savedCommunity.name,
      onFavouriteClicked: onFavouriteClickedSpy,
      url: savedCommunity.url,
    });
    wrapper.find('StyledIcon').simulate('click');
    expect(onFavouriteClickedSpy).toHaveBeenCalled();
  });
});
