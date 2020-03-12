import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';

import MorePictures from 'sly/components/organisms/MorePictures';
import SlyEvent from 'sly/services/helpers/events';
import FullscreenMediaGallery from 'sly/components/molecules/FullscreenMediaGallery';
import { prefetch } from 'sly/services/newApi';

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))
export default class CommunityMorePicturesContainer extends Component {
  static typeHydrationId = 'CommunityMorePicturesContainer';
  static propTypes = {
    community: object.isRequired,
  };

  state = { isFullscreen: false, currentIndex: 0 };

  handlePictureClick = (picture, pictureIndex) => {
    SlyEvent.getInstance().sendEvent({
      action: 'show',
      category: 'images',
      label: this.props.community.id,
      value: picture.id,
    });

    this.setState({ isFullscreen: true, currentIndex: pictureIndex });
  };

  handlePictureChange = (index) => {
    this.setState({ currentIndex: index });
  };

  handleCloseFullscreen = () => {
    this.setState({ isFullscreen: false });
  };

  render() {
    const {
      community: { name, address: { city, state }, gallery },
    } = this.props;

    const images = gallery.images.map((img, i) => {
      return {
        ...img,
        src: img.hd,
        alt: `${name}, ${city}, ${state}  ${i + 1}`,
      };
    });

    return (
      <>
        <MorePictures
          images={images}
          onPictureClick={this.handlePictureClick}
        />
        <FullscreenMediaGallery
          onClose={this.handleCloseFullscreen}
          onSlideChange={this.handlePictureChange}
          images={images}
          currentSlide={this.state.currentIndex}
          isOpen={this.state.isFullscreen}
        />
      </>
    );
  }
}
