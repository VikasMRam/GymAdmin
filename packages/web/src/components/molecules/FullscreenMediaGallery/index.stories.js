import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import FullscreenMediaGallery from 'sly/web/components/molecules/FullscreenMediaGallery';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

function onClose() {
  action('modal close triggered');
}

class FullscreenMediaGalleryWithState extends Component {
  state = {
    index: 0,
  };
  onSlideChange = (index) => {
    this.setState({
      index,
    });
  };
  render() {
    return (
      <FullscreenMediaGallery
        {...this.props}
        currentSlide={this.state.index}
        onSlideChange={this.onSlideChange}
      />
    );
  }
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
  .add('default', () => <FullscreenMediaGalleryWithState images={galleryImages} onClose={onClose} />)
  .add('with videos', () => <FullscreenMediaGalleryWithState images={galleryImages} videos={galleryVideos} onClose={onClose} />);
