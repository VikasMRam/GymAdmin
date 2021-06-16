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

const CommunityMediaGallery = ({
  communityName, city, state, images, videos, websiteUrl, ariaHideApp, currentSlide,
  onSlideChange, isFullscreenMode, onToggleFullscreenMode,
}) => {
  const galleryImages = useMemo(
    () => images.map((image, i) => ({ ...image, alt: `${communityName}, ${city}, ${state} ${i + 1}` })),
    [images, communityName, city, state],
  );

  const formattedVideos = useMemo(
    () => videos.map((vid) => {
      const src = [];
      if (vid.url) src.push({ url: vid.url, type: 'mp4' });
      if (vid.webmUrl) src.push({ url: vid.webmUrl, type: 'webm' });
      return { ...vid, src, thumb: vid.thumbUrl };
    }), [videos]);

  const galleryVideos = useMemo(
    () => videos.map((vid, i) => ({
      ...vid, path: galleryImages[0]?.path, ofVideo: i, alt: `${communityName}, ${city}, ${state} ${i + 1}` }),
    ), [videos],
  );

  const galleryItems = useMemo(() => galleryVideos.concat(galleryImages), [galleryVideos, galleryImages]);

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
          communityName={communityName}
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
          videos={formattedVideos}
          images={galleryItems}
          onClose={() => onToggleFullscreenMode(!!galleryItems[currentSlide].ofVideo)}
          ariaHideApp={ariaHideApp}
          onSlideChange={onSlideChange}
        />
      </>
    </>
  );
};

CommunityMediaGallery.propTypes = {
  communityName: string.isRequired,
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

CommunityMediaGallery.defaultProps = {
  currentSlide: 0,
  isFullscreenMode: false,
};

export default CommunityMediaGallery;
