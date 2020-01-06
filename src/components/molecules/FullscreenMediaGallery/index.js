import React from 'react';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import Modal from 'sly/components/molecules/Modal';
import MediaGallery from 'sly/components/molecules/MediaGallery';

export const StyledMediaGallery = styled(MediaGallery)`
  .media-carousel-control-prev, .media-carousel-control-next {
    margin-left: initial;
    margin-right: initial;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    .media-carousel-control-prev {
      margin-left: calc(-${size('spacing.huge')} + -${size('spacing.regular')});
    }
    .media-carousel-control-next {
      margin-right: calc(-${size('spacing.huge')} + -${size('spacing.regular')});
    }
  }

  height: ${size('carousel.mobile')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: ${size('carousel.tablet')};
  }
`;

const CopyrightWrapper = styled.div`
  background: ${palette('slate', 'base')}80;
  color: ${palette('slate', 'filler')};
  font-size: ${size('text.tiny')};
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;

const FullscreenMediaGallery = ({
  images, sizes, videos, currentSlide, isOpen, onClose, ariaHideApp, onSlideChange,
}) => {
  const bottomLeftSection = (slide) => {
    if (slide.type === 'video') {
      return null;
    }
    return (
      <CopyrightWrapper>
        This image maybe subject to copyright
      </CopyrightWrapper>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      layout="gallery"
      closeable
      transparent
      onClose={onClose}
      ariaHideApp={ariaHideApp}
    >
      <StyledMediaGallery
        currentSlide={currentSlide}
        images={images}
        sizes={sizes}
        videos={videos}
        bottomLeftSection={bottomLeftSection}
        onSlideChange={onSlideChange}
        showThumbnails
        transparent
      />
    </Modal>
  );
};

FullscreenMediaGallery.propTypes = {
  isOpen: PropTypes.bool,
  currentSlide: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  })),
  sizes: string,
  videos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  })),
  onClose: PropTypes.func.isRequired,
  ariaHideApp: PropTypes.bool,
  onSlideChange: PropTypes.func.isRequired,
};

FullscreenMediaGallery.defaultProps = {
  isOpen: true,
  images: [],
  videos: [],
  currentSlide: 0,
};

export default FullscreenMediaGallery;
