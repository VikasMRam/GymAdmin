import React from 'react';
import PropTypes from 'prop-types';

import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import SlyEvent from 'sly/services/helpers/events';

export default class CommunityMediaGalleryContainer extends React.Component {
  static typeHydrationId = 'CommunityMediaGalleryContainer';
  static propTypes = {
    community: PropTypes.object.isRequired,
  };

  state = {
    currentSlideIndex: 0,
    isFullscreenActive: false,
  };

  handleMediaGallerySlideChange = (slideIndex) => {
    this.setState({ currentSlideIndex: slideIndex });
  };

  handleToggleMediaGalleryFullscreen = (isVideo, fromSeeMoreButton) => {
    const { id: communityId, gallery = {}, videoGallery = {} } = this.props.community;
    const { isFullscreenActive, currentSlideIndex } = this.state;

    const images = gallery.images || [];
    const videos = videoGallery.videos || [];

    if (fromSeeMoreButton) {
      const event = {
        action: 'show',
        category: 'fullscreenMediaGallery',
        label: communityId,
        value: 'seeMoreButton',
      };
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[currentSlideIndex] || {};
      if (video) {
        SlyEvent.getInstance().sendEvent({
          action: isFullscreenActive ? 'hide' : 'show',
          category: 'mediaGalleryVideo',
          label: communityId,
          value: video.id,
        });
      }
    } else {
      const image = images[currentSlideIndex - videos.length] || {};
      SlyEvent.getInstance().sendEvent({
        action: isFullscreenActive ? 'hide' : 'show',
        category: 'fullscreenMediaGallery',
        label: communityId,
        value: image.id,
      });
    }

    this.setState({
      isFullscreenActive: !isFullscreenActive,
    });
  };

  render() {
    const {
      community: {
        name,
        address,
        gallery = { images: [] },
        videoGallery = { videos: [] },
        propInfo: { websiteUrl },
      },
    } = this.props;
    const { isFullscreenActive, currentSlideIndex } = this.state;

    return (
      <CommunityMediaGallery
        communityName={name}
        city={address.city}
        state={address.state}
        currentSlide={currentSlideIndex}
        images={gallery.images || []}
        videos={videoGallery.videos || []}
        websiteUrl={websiteUrl}
        onSlideChange={this.handleMediaGallerySlideChange}
        isFullscreenMode={isFullscreenActive}
        onToggleFullscreenMode={this.handleToggleMediaGalleryFullscreen}
      />
    );
  }
}
