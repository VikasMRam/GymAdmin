import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Modal from 'sly/components/molecules/Modal';
import MediaGallery from 'sly/components/molecules/MediaGallery';

const StyledMediaGallery = styled(MediaGallery)`
  .media-carousel-control-prev, .media-carousel-control-next {
    margin-left: initial;
    margin-right: initial;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    .media-carousel-control-prev {
      margin-left: -${size('spacing.huge')};
    }
    .media-carousel-control-next {
      margin-right: -${size('spacing.huge')};
    }
  }
`;

const FullscreenMediaGallery = ({
  images, videos, currentSlide, isOpen, onClose, ariaHideApp,
}) => (
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
      videos={videos}
      showThumbnails
      transparent
    />
  </Modal>
);

FullscreenMediaGallery.propTypes = {
  isOpen: PropTypes.bool,
  currentSlide: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  })),
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
};

FullscreenMediaGallery.defaultProps = {
  isOpen: true,
  images: [],
  videos: [],
};

export default FullscreenMediaGallery;
