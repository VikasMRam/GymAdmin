import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import MediaGallery from 'sly/web/components/molecules/MediaGallery';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

class MediaGalleryWithState extends Component {
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
      <MediaGallery
        {...this.props}
        currentSlide={this.state.index}
        onSlideChange={this.onSlideChange}
      />
    );
  }
}

const { name, gallery } = RhodaGoldmanPlaza;
const { images } = gallery;
const galleryImages = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.hd;
  newImg.alt = `${name} ${i + 1}`;
  return newImg;
});

storiesOf('Molecules|MediaGallery', module)
  .add('default', () => <MediaGalleryWithState images={galleryImages} />);
