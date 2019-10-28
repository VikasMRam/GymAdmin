import React from 'react';
import PropTypes from 'prop-types';
import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import SlyEvent from 'sly/services/helpers/events';

export default class CommunityMediaGalleryContainer extends React.Component {
  static propTypes = {
    community: PropTypes.object,
  };

  state = {
    currentSlideIndex: 0,
    isFullscreenActive: false,
  };

  handleMediaGallerySlideChange = (slideIndex, fromMorePictures) => {
    const { community } = this.props;
    if (fromMorePictures) {
      const { id } = community;
      const { gallery = {}, videoGallery = {} } = community;
      const images = gallery.images || [];
      const videos = videoGallery.videos || [];
      const image = images[slideIndex - videos.length];
      const event = {
        action: 'show',
        category: 'images',
        label: id,
        value: image.id,
      };
      SlyEvent.getInstance().sendEvent(event);
    }
    this.setState({
      currentSlideIndex: slideIndex,
    });
  };

  handleToggleMediaGalleryFullscreen = (
    fromMorePictures,
    isVideo,
    fromSeeMoreButton
  ) => {
    const { community } = this.props;
    const { isFullscreenActive, currentSlideIndex } = this.state;

    const { id, gallery = {}, videoGallery = {} } = community;
    const images = gallery.images || [];
    const videos = videoGallery.videos || [];
    if (fromSeeMoreButton) {
      const event = {
        action: 'show',
        category: 'fullscreenMediaGallery',
        label: id,
        value: 'seeMoreButton',
      };
      SlyEvent.getInstance().sendEvent(event);
    } else if (!fromMorePictures && !isVideo) {
      const image = images[currentSlideIndex - videos.length];
      const event = {
        action: 'show',
        category: 'fullscreenMediaGallery',
        label: id,
      };
      if (image) {
        event.value = image.id;
      }
      if (isFullscreenActive) {
        event.action = 'hide';
      }
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[currentSlideIndex];
      if (video) {
        const event = {
          action: 'show',
          category: 'mediaGalleryVideo',
          label: id,
          value: video.id,
        };
        if (isFullscreenActive) {
          event.action = 'hide';
        }
        SlyEvent.getInstance().sendEvent(event);
      }
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
