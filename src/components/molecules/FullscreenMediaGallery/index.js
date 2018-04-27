import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'sly/components/molecules/Modal';
import MediaGallery from 'sly/components/molecules/MediaGallery';

const FullscreenMediaGallery = ({
  images, videos, currentSlide, isOpen, onClose,
}) => (
  <Modal
    isOpen={isOpen}
    layout="gallery"
    closeable
    transparent
    onClose={onClose}
  >
    <MediaGallery
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
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  })),
  onClose: PropTypes.func.isRequired,
};

FullscreenMediaGallery.defaultProps = {
  isOpen: true,
  images: [],
  videos: [],
};

export default FullscreenMediaGallery;
