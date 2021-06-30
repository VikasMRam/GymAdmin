import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import ListingMediaGallery from 'sly/web/listing/ListingMediaGallery/ListingMediaGallery';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api';
import { assetPath } from 'sly/web/components/themes';

// TODO: move this to common helper, used in multiple places
const listingDefaultImages = {
  'up to 20 Beds': assetPath('vectors/Board_and_Care.svg'),
  '20 - 51 Beds': assetPath('vectors/Medium_Assisted_Living.svg'),
  '51 +': assetPath('vectors/Large_Assisted_Living.svg'),
};

function getImages({ gallery = {} }) {
  const defaultImageUrl = listingDefaultImages['up to 20 Beds'];
  let images = (gallery?.images || []).map(image => ({
    id: image.id,
    path: image.path,
    description: image?.description || ' ',
  }));

  // if images is empty add default image
  if (images.length === 0) {
    images = [{ src: defaultImageUrl }];
  }

  // // If there is a mainImage put it in front
  // const mainImageIndex = images.findIndex((image) => {
  //   return image.path && mainImage.indexOf(image.path) !== -1;
  // });

  // if (mainImageIndex !== -1) {
  //   const [listingMainImage] = images.splice(mainImageIndex, 1);
  //   images.unshift(listingMainImage);
  // }

  return images;
}

const ListingMediaGalleryContainer = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);

  const { id } = useParams();

  const { requestInfo: { normalized: listing, hasFinished: listingRequestHasFinished } } = usePrefetch('getListing', {
    id,
    include: 'questions,agents',
  });

  const { id: listingId, gallery = {}, videoGallery = {} } = listing || {};

  const handleMediaGallerySlideChange = useCallback(slideIndex => setCurrentSlideIndex(slideIndex), []);

  const handleToggleMediaGalleryFullscreen = useCallback((isVideo, fromSeeMoreButton) => {
    const images = gallery?.images || [];
    const videos = videoGallery?.videos || [];

    const action = isFullscreenActive ? 'hide' : 'show';

    if (fromSeeMoreButton) {
      const event = { action: 'show', category: 'fullscreenMediaGallery', label: listingId, value: 'seeMoreButton' };
      SlyEvent.getInstance().sendEvent(event);
    } else if (isVideo) {
      const video = videos[currentSlideIndex] || {};
      if (video) {
        SlyEvent.getInstance().sendEvent({ action, category: 'mediaGalleryVideo', label: listingId, value: video.id });
      }
    } else {
      const image = images[currentSlideIndex - videos.length] || {};
      SlyEvent.getInstance().sendEvent({ action, category: 'fullscreenMediaGallery', label: listingId, value: image.id });
    }

    setIsFullscreenActive(prevState => !prevState);
  }, [listingId, gallery, videoGallery]);

  if (!listingRequestHasFinished || !listing) return null;

  return (
    <ListingMediaGallery
      listingName={listing.name}
      city={listing.address.city}
      state={listing.address.state}
      currentSlide={currentSlideIndex}
      images={getImages(listing)}
      videos={videoGallery?.videos}
      onSlideChange={handleMediaGallerySlideChange}
      isFullscreenMode={isFullscreenActive}
      onToggleFullscreenMode={handleToggleMediaGalleryFullscreen}
    />
  );
};

ListingMediaGalleryContainer.typeHydrationId = 'ListingMediaGalleryContainer';

export default ListingMediaGalleryContainer;
