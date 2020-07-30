import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import CommunityMediaGallery from 'sly/web/components/organisms/CommunityMediaGallery';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';


class CommunityMediaGalleryWithState extends Component {
  state = {
    index: 0,
    fullscreen: false,
  };
  onSlideChange = (index) => {
    this.setState({
      index,
    });
  };
  onToggleFullscreenMode = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    });
  };
  render() {
    return (
      <CommunityMediaGallery
        {...this.props}
        currentSlide={this.state.index}
        onSlideChange={this.onSlideChange}
        isFullscreenMode={this.state.fullscreen}
        onToggleFullscreenMode={this.onToggleFullscreenMode}
      />
    );
  }
}

const { name, gallery, videoGallery } = RhodaGoldmanPlaza;
const images = gallery.images || [];
const videos = videoGallery.videos || [];

storiesOf('Organisms|CommunityMediaGallery', module)
  .add('default', () => <CommunityMediaGalleryWithState communityName={name} videos={videos} images={images} />);
