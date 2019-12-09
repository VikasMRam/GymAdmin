import React from 'react';
import { mount } from 'enzyme';
import SwipeableViews from 'react-swipeable-views';

import ThumbnailScroller from 'sly/components/molecules/ThumbnailScroller';
import MediaGallery from 'sly/components/molecules/MediaGallery';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const wrap = (props = {}) => mount(<MediaGallery {...props} />);

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

// FIXME: will have to rewrite this tests entirely
describe.skip('MediaGallery', () => {
  it('default', () => {
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, ariaHideApp: false, onClose, onSlideChange,
    });
    expect(wrapper.find('Image')).toHaveLength(galleryImages.length);
    expect(wrapper.find('video')).toHaveLength(galleryVideos.length);
    expect(wrapper.find(ThumbnailScroller)).toHaveLength(0);
  });

  it('with thumbnail scroller enabled', () => {
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, ariaHideApp: false, showThumbnails: true, onSlideChange,
    });
    expect(wrapper.find(SwipeableViews).find('Image')).toHaveLength(galleryImages.length);
    expect(wrapper.find('video')).toHaveLength(galleryVideos.length);
    expect(wrapper.find(ThumbnailScroller)).toHaveLength(1);
  });

  it('setLoadedImages without currentSlide property passed', () => {
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, ariaHideApp: false, onSlideChange,
    });
    const totalSlides = (galleryImages.length > 2 ? galleryImages.length - 1 : galleryImages.length) +
      (galleryVideos.length > 2 ? galleryVideos.length - 1 : galleryVideos.length);
    const intiallyLoadedSlideCount = 3;
    // intially 3 slides will be loaded: slide before, current slide, slide after
    expect(wrapper.instance().mediaLoaded.size).toBe(intiallyLoadedSlideCount);
    expect(wrapper.instance().mediaLoaded.has(totalSlides)).toBe(true);
    // selecting slide at index 2 will load: slide at index 1, slide at index 2 & slide at index 3
    wrapper.instance().setLoadedImages(2);
    expect(wrapper.instance().mediaLoaded.size).toBe(intiallyLoadedSlideCount + 2);
    expect(wrapper.instance().mediaLoaded.has(3)).toBe(true);
  });

  it('setLoadedImages with currentSlide property passed', () => {
    const currentSlide = galleryImages.length / 2;
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, currentSlide, ariaHideApp: false, onSlideChange,
    });
    const totalSlides = (galleryImages.length > 2 ? galleryImages.length - 1 : galleryImages.length) +
      (galleryVideos.length > 2 ? galleryVideos.length - 1 : galleryVideos.length);
    const intiallyLoadedSlideCount = 3;
    // intially 3 slides will be loaded: slide before, current slide, slide after
    expect(wrapper.instance().mediaLoaded.size).toBe(intiallyLoadedSlideCount);
    expect(wrapper.instance().mediaLoaded.has(currentSlide - 1)).toBe(true);
    expect(wrapper.instance().mediaLoaded.has(currentSlide + 1)).toBe(true);
    // selecting second last slide will load ..... as you know
    wrapper.instance().setLoadedImages(totalSlides - 1);
    expect(wrapper.instance().mediaLoaded.size).toBe(intiallyLoadedSlideCount + 3);
    expect(wrapper.instance().mediaLoaded.has(totalSlides)).toBe(true);
    expect(wrapper.instance().mediaLoaded.has(totalSlides - 1)).toBe(true);
    expect(wrapper.instance().mediaLoaded.has(totalSlides - 2)).toBe(true);
  });

  // TODO: add tests for nextSlide & prevSlide. Currently jsdom does not support play and pause methods on video tags. These are called when
  // slide changes, hence find workaround to properly test it

  it('shouldLoadMedia', () => {
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, ariaHideApp: false, onSlideChange,
    });
    const totalSlides = (galleryImages.length > 2 ? galleryImages.length - 1 : galleryImages.length) +
      (galleryVideos.length > 2 ? galleryVideos.length - 1 : galleryVideos.length);
    expect(wrapper.instance().shouldLoadMedia(0)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(1)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(2)).toBe(false);
    expect(wrapper.instance().shouldLoadMedia(totalSlides)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(totalSlides - 1)).toBe(false);
  });

  it('shouldLoadMedia after changing slide', () => {
    const currentSlide = galleryImages.length / 2;
    const wrapper = wrap({
      images: galleryImages, videos: galleryVideos, onClose, ariaHideApp: false, currentSlide, onSlideChange,
    });
    const totalSlides = (galleryImages.length > 2 ? galleryImages.length - 1 : galleryImages.length) +
      (galleryVideos.length > 2 ? galleryVideos.length - 1 : galleryVideos.length);
    expect(wrapper.instance().shouldLoadMedia(0)).toBe(false);
    expect(wrapper.instance().shouldLoadMedia(currentSlide - 1)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(currentSlide)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(currentSlide + 1)).toBe(true);
    expect(wrapper.instance().shouldLoadMedia(totalSlides)).toBe(false);
  });
});
