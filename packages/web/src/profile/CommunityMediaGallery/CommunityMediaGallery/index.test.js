import React from 'react';
import { shallow } from 'enzyme';

import CommunityMediaGallery from 'sly/web/profile/CommunityMediaGallery/CommunityMediaGallery';
import FullscreenMediaGallery from 'sly/web/profile/CommunityMediaGallery/FullscreenMediaGallery';
import MediaGallery from 'sly/web/profile/CommunityMediaGallery/MediaGallery/index';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

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
    const imgsProp = mediaGallery.prop('images');
    expect(imgsProp).toHaveLength(videos.length + images.length);
    expect(wrapper.find(FullscreenMediaGallery)).toHaveLength(1);
  });
});
