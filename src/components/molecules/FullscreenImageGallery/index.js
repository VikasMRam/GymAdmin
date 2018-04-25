import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'sly/components/molecules/Modal';
import ImageGallery from 'sly/components/molecules/ImageGallery';

const FullscreenImageGallery = ({ images, isOpen, onClose }) => (
  <Modal isOpen={isOpen} layout="gallery" closeable transparent onClose={onClose}>
    <ImageGallery images={images} showThumbnails transparent />
  </Modal>
);

FullscreenImageGallery.propTypes = {
  isOpen: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
  })),
  onClose: PropTypes.func.isRequired,
};

FullscreenImageGallery.defaultProps = {
  isOpen: true,
  images: [],
};

export default FullscreenImageGallery;
