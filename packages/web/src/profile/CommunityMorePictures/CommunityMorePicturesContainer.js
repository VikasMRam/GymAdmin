import React, { useCallback, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import MorePictures from 'sly/web/components/organisms/MorePictures';
import SlyEvent from 'sly/web/services/helpers/events';
import FullscreenMediaGallery from 'sly/web/profile/CommunityMediaGallery/FullscreenMediaGallery';
import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunityMorePicturesContainer = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const { name, address: { city, state }, gallery } = community;

  const images = useMemo(() => gallery.images.map((img, i) => ({
    id: img.id,
    path: img.path,
    alt: `${name}, ${city}, ${state}  ${i + 1}`,
  })), [gallery]);

  const handlePictureClick = useCallback((picture, pictureIndex) => {
    SlyEvent.getInstance().sendEvent({
      action: 'show',
      category: 'images',
      label: this.props.community.id,
      value: picture.id,
    });

    setIsFullscreen(true);
    setCurrentIndex(pictureIndex);
  }, []);

  const handlePictureChange = useCallback(index => setCurrentIndex(index), []);

  const handleCloseFullscreen = useCallback(() => setIsFullscreen(false), []);

  return (
    <>
      <MorePictures
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

CommunityMorePicturesContainer.typeHydrationId = 'CommunityMorePicturesContainer';

export default React.memo(CommunityMorePicturesContainer);
