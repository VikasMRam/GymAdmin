import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/web/components/molecules/FullscreenMediaGallery';
import CommunityMediaGallery from 'sly/web/components/organisms/CommunityMediaGallery';

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
