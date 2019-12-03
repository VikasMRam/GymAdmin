import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import CommunityMediaGallery from 'sly/components/organisms/CommunityMediaGallery';
import SlyEvent from 'sly/services/helpers/events';
import { prefetch } from 'sly/services/newApi';
import { assetPath } from 'sly/components/themes';

// TODO: move this to common helper, used in multiple places
const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

function getImages({ gallery = {}, videoGallery = {}, mainImage, propInfo = {} }) {
  const defaultImageUrl = communityDefaultImages[propInfo.communitySize] || communityDefaultImages['up to 20 Beds'];

  let images = gallery.images || [];

  // if images is empty add default image
  if (images.length === 0) {
    images = [{
      sd: defaultImageUrl,
      hd: defaultImageUrl,
      thumb: defaultImageUrl,
      url: defaultImageUrl,
    }];
  }

  // If there is a mainImage put it in front
  const communityMainImage = images.find((element) => {
    return element.sd === mainImage;
  });

  if (communityMainImage) {
    images = images.filter(img => img.sd !== communityMainImage.sd);
    images.unshift(communityMainImage);
  }

  return images;
}

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))
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
    const { community } = this.props;
    const { videoGallery = { videos: [] } } = community;

    const { isFullscreenActive, currentSlideIndex } = this.state;

    return (
      <CommunityMediaGallery
        communityName={community.name}
        city={community.address.city}
        state={community.address.state}
        currentSlide={currentSlideIndex}
        images={getImages(community)}
        videos={videoGallery.videos || []}
        websiteUrl={community.propInfo.websiteUrl}
        onSlideChange={this.handleMediaGallerySlideChange}
        isFullscreenMode={isFullscreenActive}
        onToggleFullscreenMode={this.handleToggleMediaGalleryFullscreen}
        typeCare={community.propInfo.typeCare}
      />
    );
  }
}
