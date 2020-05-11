import React from 'react';
import { shallow } from 'enzyme';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import Modal from 'sly/components/molecules/Modal';
import FullscreenMediaGallery, { StyledMediaGallery } from 'sly/components/molecules/FullscreenMediaGallery';

const wrap = (props = {}) => shallow(<FullscreenMediaGallery {...props} />);

const onClose = jest.fn();
const onSlideChange = jest.fn();

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];
const galleryImages = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.hd;
  newImg.alt = `${name} ${i + 1}`;
  return newImg;
});
const galleryVideos = videos.map((vid) => {
  const src = [];
  if (vid.url) {
    src.push({
      url: vid.url,
      type: 'mp4',
    });
  }
  if (vid.webmUrl) {
    src.push({
      url: vid.webmUrl,
      type: 'webm',
    });
  }

  return { ...vid, src, thumb: vid.thumbUrl };
});

describe('FullscreenMediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, ariaHideApp: false, onSlideChange,
    });
    const modal = wrapper.find(Modal);
    expect(modal.exists()).toBe(true);
    expect(modal.find(StyledMediaGallery).exists()).toBe(true);
  });
});
