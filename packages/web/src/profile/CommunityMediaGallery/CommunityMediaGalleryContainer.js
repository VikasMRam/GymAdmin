import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommunityMediaGallery from 'sly/web/profile/CommunityMediaGallery/CommunityMediaGallery';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api';
import { assetPath } from 'sly/web/components/themes';

// TODO: move this to common helper, used in multiple places
const communityDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

function getImages({ gallery = {}, mainImage, propInfo = {} }) {
  const defaultImageUrl = communityDefaultImages[propInfo?.communitySize] || communityDefaultImages['up to 20 Beds'];

  let images = (gallery?.images || []).map(image => ({
    id: image.id,
    path: image.path,
    description: image.description,
  }));

  // if images is empty add default image
  if (images.length === 0) {
    images = [{ src: defaultImageUrl }];
  }

  // If there is a mainImage put it in front
  const mainImageIndex = images.findIndex((image) => {
    return image.path && mainImage.indexOf(image.path) !== -1;
  });

  if (mainImageIndex !== -1) {
    const [communityMainImage] = images.splice(mainImageIndex, 1);
    images.unshift(communityMainImage);
  }

  return images;
}

const CommunityMediaGalleryContainer = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community, hasFinished: communityRequestHasFinished } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const { id: communityId, gallery = {}, videoGallery = {} } = community || {};

  const handleMediaGallerySlideChange = useCallback(slideIndex => setCurrentSlideIndex(slideIndex), []);

  const handleToggleMediaGalleryFullscreen = useCallback((isVideo, fromSeeMoreButton) => {
    const images = gallery?.images || [];
    const videos = videoGallery?.videos || [];

    const action = isFullscreenActive ? 'hide' : 'show';

    if (fromSeeMoreButton) {
      const event = { action: 'show', category: 'fullscreenMediaGallery', label: communityId, value: 'seeMoreButton' };
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[currentSlideIndex] || {};
      if (video) {
        SlyEvent.getInstance().sendEvent({ action, category: 'mediaGalleryVideo', label: communityId, value: video.id });
      }
    } else {
      const image = images[currentSlideIndex - videos.length] || {};
      SlyEvent.getInstance().sendEvent({ action, category: 'fullscreenMediaGallery', label: communityId, value: image.id });
    }

    setIsFullscreenActive(prevState => !prevState);
  }, [communityId, gallery, videoGallery]);

  if (!communityRequestHasFinished || !community) return null;

  return (
    <CommunityMediaGallery
      communityName={community.name}
      city={community.address.city}
      state={community.address.state}
      currentSlide={currentSlideIndex}
      images={getImages(community)}
      videos={videoGallery?.videos}
      websiteUrl={community.propInfo?.websiteUrl}
      onSlideChange={handleMediaGallerySlideChange}
      isFullscreenMode={isFullscreenActive}
      onToggleFullscreenMode={handleToggleMediaGalleryFullscreen}
      typeCare={community.propInfo?.typeCare}
    />
  );
};

CommunityMediaGalleryContainer.typeHydrationId = 'CommunityMediaGalleryContainer';

export default CommunityMediaGalleryContainer;
