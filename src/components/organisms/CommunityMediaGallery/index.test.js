import React from 'react';
import { mount } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityMediaGallery from '.';

import { Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';

const wrap = (props = {}) => mount(<CommunityMediaGallery {...props} />);

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];

describe('MediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false,
    });
    /* TEMPORARILY DISABLE THIS
    expect(wrapper.find(Icon).find({ icon: 'heart' })).toHaveLength(1);
    expect(wrapper.find(Icon).find({ icon: 'share' })).toHaveLength(1);
    */
    expect(wrapper.find(MediaGallery)).toHaveLength(1);
    expect(wrapper.find(FullscreenMediaGallery)).toHaveLength(1);
  });

  it('verify toggleModal clicked', () => {
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false,
    });
    wrapper.instance().toggleModal();
    expect(wrapper.find(MediaGallery)).toHaveLength(1);
    expect(wrapper.find(FullscreenMediaGallery)).toHaveLength(1);
  });
});
