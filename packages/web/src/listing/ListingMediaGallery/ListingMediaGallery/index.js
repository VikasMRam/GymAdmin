import React, { useCallback, useMemo } from 'react';
import { string, object, arrayOf, shape, bool, number, func } from 'prop-types';

import MediaGallery from 'sly/web/profile/CommunityMediaGallery/MediaGallery';
import { sx, color, Span } from 'sly/common/system';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Button from 'sly/common/system/Button';
import Link from 'sly/common/system/Link';
import FullscreenMediaGallery from 'sly/web/profile/CommunityMediaGallery/FullscreenMediaGallery';

const IconButton = ({ icon: Icon, text, iconColor, active, hideTextInMobile, ...rest }) => (
  <Button
    {...rest}
  >
    <Flex align="center" justifyContent="center">
      <Icon color={iconColor} active={active} />
      <Block display={hideTextInMobile && 'none'} ml="xs" sx$tablet={{ display: 'block' }}>{text}</Block>
    </Flex>
  </Button>
);

IconButton.propTypes = {
  icon: func,
  text: string,
  iconColor: bool,
  active: bool,
  hideTextInMobile: bool,
};

const ListingMediaGallery = ({
  listingName, city, state, images, websiteUrl, ariaHideApp, currentSlide,
  onSlideChange, isFullscreenMode, onToggleFullscreenMode,
}) => {
  const galleryImages = useMemo(
    () => images.map((image, i) => ({ ...image, alt: `${listingName}, ${city}, ${state} ${i + 1}` })),
    [images, listingName, city, state],
  );

  const galleryItems = useMemo(() => galleryImages, [galleryImages]);

  const bottomLeftSection = useCallback(() => websiteUrl && (
    <Span
      sx={{
        background: sx`${color('black.base')}30`,
        font: 'body-xs',
        p: 'xxxs xxs',
        borderRadius: 'xxs',
        overflow: 'hidden',
      }}
    >
      <Link color="white.base" href={websiteUrl} target="_blank" rel="noopener">Image source</Link>
    </Span>
  ), [websiteUrl]);

  const bottomRightSection = useCallback(() => galleryItems.length > 1 && (
    <Button
      variant="neutral"
      p="s m"
      display="none"
      sx$tablet={{ display: 'inline-block' }}
      onClick={() => onToggleFullscreenMode(false, true)}
    >
      See all {galleryItems.length} photos
    </Button>
  ), [galleryItems]);

  return (
    <>
      <>
        <MediaGallery
          onSlideClick={(i) => {
            onToggleFullscreenMode(!!galleryItems[i].ofVideo);
            currentSlide !== i && onSlideChange(i);
          }}
          aspectRatio="4:3"
          communityName={listingName}
          images={galleryItems}
          sizes="(max-width: 1079px) 100vw, 680px"
          bottomRightSection={bottomRightSection}
          bottomLeftSection={bottomLeftSection}
          currentSlide={currentSlide}
          onSlideChange={onSlideChange}
          withoutCtaButtons
        />
        <FullscreenMediaGallery
          currentSlide={currentSlide}
          isOpen={isFullscreenMode}
          sizes="(max-width: 1199px) 100vw, 1200px"

          images={galleryItems}
          onClose={() => onToggleFullscreenMode(!!galleryItems[currentSlide].ofVideo)}
          ariaHideApp={ariaHideApp}
          onSlideChange={onSlideChange}
        />
      </>
    </>
  );
};

ListingMediaGallery.propTypes = {
  listingName: string.isRequired,
  images: arrayOf(shape({
    src: string,
    path: string,
    formats: object,
  })),
  videos: arrayOf(shape({
    url: string.isRequired,
    name: string.isRequired,
    thumbPath: string.isRequired,
  })),
  city: string,
  state: string,
  websiteUrl: string,
  ariaHideApp: bool,
  currentSlide: number,
  onSlideChange: func.isRequired,
  isFullscreenMode: bool,
  onToggleFullscreenMode: func,
};

ListingMediaGallery.defaultProps = {
  currentSlide: 0,
  isFullscreenMode: false,
};

export default ListingMediaGallery;
