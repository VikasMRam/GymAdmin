import React, { useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import ImageByCategory from 'sly/web/listing/components/ImageByCategory';
import SlyEvent from 'sly/web/services/helpers/events';
import FullscreenMediaGallery from 'sly/web/profile/CommunityMediaGallery/FullscreenMediaGallery';
import { usePrefetch } from 'sly/web/services/api/prefetch';

const ApartmentSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();

  const { requestInfo: { normalized: listing } } = usePrefetch('getListing', {
    id,
    include: 'similar-listings,agents,community',
  });

  const { name, address: { city, state }, gallery } = listing;

  const images = useMemo(() => gallery.images.map((img, i) => ({
    id: img.id,
    path: img.path,
    alt: `${name}, ${city}, ${state}  ${i + 1}`,
  })), [gallery]);

  const handlePictureClick = useCallback((picture, pictureIndex) => {
    SlyEvent.getInstance().sendEvent({
      action: 'show',
      category: 'images',
      label: listing.id,
      value: picture.id,
    });

    setIsFullscreen(true);
    setCurrentIndex(pictureIndex);
  }, []);

  const handlePictureChange = useCallback(index => setCurrentIndex(index), []);

  const handleCloseFullscreen = useCallback(() => setIsFullscreen(false), []);

  return (
    <>
      <ImageByCategory
        images={images}
        onPictureClick={handlePictureClick}
      />
      <FullscreenMediaGallery
        onClose={handleCloseFullscreen}
        onSlideChange={handlePictureChange}
        images={images}
        currentSlide={currentIndex}
        isOpen={isFullscreen}
      />
    </>
  );
};

ApartmentSection.typeHydrationId = 'ApartmentSection';

export default React.memo(ApartmentSection);
