import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';

const wrap = (props = {}) => shallow(<CommunityMediaGallery {...props} />);

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];
const onToggleFullscreenMode = jest.fn();
const onSlideChange = jest.fn();

describe('CommunityMediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false, onToggleFullscreenMode, onSlideChange,
    });

    const mediaGallery = wrapper.find(MediaGallery);
    expect(mediaGallery).toHaveLength(1);
    expect(mediaGallery.dive().find(Icon).find({ icon: 'favourite-empty' })).toHaveLength(1);
    expect(mediaGallery.dive().find(Icon).find({ icon: 'share' })).toHaveLength(1);
    const imgsProp = mediaGallery.prop('images');
    expect(imgsProp).toHaveLength(videos.length + images.length);
    expect(wrapper.find(FullscreenMediaGallery)).toHaveLength(1);
  });

  it('render correctly when favourited', () => {
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false, onToggleFullscreenMode, onSlideChange, isFavourited: true,
    });

    const mediaGallery = wrapper.find(MediaGallery);
    expect(mediaGallery).toHaveLength(1);
    expect(mediaGallery.dive().find(Icon).find({ icon: 'favourite-light' })).toHaveLength(1);
  });

  it('favourite button click callback called', () => {
    const onFavouriteClick = jest.fn();
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false, onToggleFullscreenMode, onSlideChange, onFavouriteClick,
    });

    const mediaGallery = wrapper.find(MediaGallery);
    expect(mediaGallery).toHaveLength(1);
    mediaGallery.dive().find(Icon).find({ icon: 'favourite-empty' }).parent()
      .simulate('click');
    expect(onFavouriteClick).toHaveBeenCalled();
  });

  it('share button click callback called', () => {
    const onShareClick = jest.fn();
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false, onToggleFullscreenMode, onSlideChange, onShareClick,
    });

    const mediaGallery = wrapper.find(MediaGallery);
    expect(mediaGallery).toHaveLength(1);
    mediaGallery.dive().find(Icon).find({ icon: 'share' }).parent()
      .simulate('click');
    expect(onShareClick).toHaveBeenCalled();
  });
});
