import React from 'react';
import { mount } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import { Icon } from 'sly/components/atoms';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import FullScreenMediaGallery from 'sly/components/molecules/FullScreenMediaGallery';
import CommunityMediaGallery from '.';

const wrap = (props = {}) => mount(<CommunityMediaGallery {...props} />);

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];

describe('MediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      communityName: name, videos, images, ariaHideApp: false,
    });
    expect(wrapper.find(Icon).find({ icon: 'heart' })).toHaveLength(1);
    expect(wrapper.find(Icon).find({ icon: 'share' })).toHaveLength(1);
    expect(wrapper.find(MediaGallery)).toHaveLength(1);
    expect(wrapper.find(FullScreenMediaGallery)).toHaveLength(0);
  });
});
