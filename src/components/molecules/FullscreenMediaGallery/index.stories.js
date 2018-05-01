import React from 'react';
import { storiesOf } from '@storybook/react';

import FullscreenMediaGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

function onClose() {
  alert('modal close triggered');
}

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

storiesOf('Molecules|FullscreenMediaGallery', module)
  .add('default', () => <FullscreenMediaGallery images={galleryImages} onClose={onClose} />)
  .add('with videos', () => <FullscreenMediaGallery images={galleryImages} videos={galleryVideos} onClose={onClose} />);
