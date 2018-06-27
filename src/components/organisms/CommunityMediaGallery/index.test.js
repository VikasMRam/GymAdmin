import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityMediaGallery from '.';

import { Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';

const wrap = (props = {}) => shallow(<CommunityMediaGallery {...props} />);

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];
const onToggleFullscreenMode = jest.fn();
const onSlideChange = jest.fn();
const communityMainImage = images[(images.length/2)].sd;

describe('CommunityMediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      communityName: name, communityMainImage, videos, images, ariaHideApp: false, onToggleFullscreenMode, onSlideChange,
    });
    /* TEMPORARILY DISABLE THIS
    expect(wrapper.find(Icon).find({ icon: 'heart' })).toHaveLength(1);
    expect(wrapper.find(Icon).find({ icon: 'share' })).toHaveLength(1);
    */
    const mediaGallery = wrapper.find(MediaGallery);
    expect(mediaGallery).toHaveLength(1);
    const imgsProp = mediaGallery.prop('images');
    expect(imgsProp).toHaveLength(videos.length + images.length);
    const firstImage = imgsProp.find((img) => {
      return !img.hasOwnProperty('ofVideo');
    });
    expect(firstImage.sd).toBe(communityMainImage);
    expect(wrapper.find(FullscreenMediaGallery)).toHaveLength(1);
  });
});
