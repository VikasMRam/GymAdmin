import React, { useCallback, useState, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ImageByCategory from 'sly/web/listing/components/ImageByCategory';
import SlyEvent from 'sly/web/services/helpers/events';
import FullscreenMediaGallery from 'sly/web/profile/CommunityMediaGallery/FullscreenMediaGallery';
import { usePrefetch } from 'sly/web/services/api/prefetch';
import ListingContext from 'sly/web/listing/context/ListingContext';

const ApartmentSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { listing } = useContext(ListingContext);

  // const { id } = useParams();

  // const { requestInfo: { normalized: listing } } = usePrefetch('getListing', {
  //   id,
  //   include: 'similar-listings,agent,community,reviews',
  // });

  const { name, address: { city, state }, gallery } = listing;

  const { images } = gallery;

  // get unique image from each category
  const filteredImages = useMemo(() => [...images.filter(image => image.category).reduce((map, obj) => map.set(obj.category.id, obj), new Map()).values()], [images]);

  const memoiedImages = useMemo(() => filteredImages.map((img, i) => ({
    id: img.id,
    path: img.path,
    alt: `${name}, ${city}, ${state}  ${i + 1}`,
    category: img?.category,
  })), [filteredImages]);

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
        images={memoiedImages}
        onPictureClick={handlePictureClick}
      />
      <FullscreenMediaGallery
        onClose={handleCloseFullscreen}
        onSlideChange={handlePictureChange}
        images={memoiedImages}
        currentSlide={currentIndex}
        isOpen={isFullscreen}
      />
    </>
  );
};

ApartmentSection.typeHydrationId = 'ApartmentSection';

export default React.memo(ApartmentSection);
