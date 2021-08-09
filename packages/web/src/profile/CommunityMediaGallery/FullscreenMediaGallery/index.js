import React, { useMemo } from 'react';
import PropTypes, { string } from 'prop-types';
import styled from 'styled-components';

import MediaGallery from 'sly/web/profile/CommunityMediaGallery/MediaGallery';
import Modal from 'sly/web/components/molecules/Modal';
import { color, space, sx } from 'sly/common/system';
import ThumbsUp from 'sly/common/icons/ThumbsUp';
import Block from 'sly/common/system/Block';
import Flex from 'sly/common/system/Flex';
import Button from 'sly/common/system/Button';

export const StyledModal = styled(Modal)`
  background: ${color('black.base')};

  & > div > div:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 ${space('l')};
    height: ${space('xxxl')};
    background: ${color('black.base')};

    & button:last-child > div {
      justify-content: flex-end;
    }
  }

  article {
    width: 100% !important;
    border-radius: unset;

    top: 5rem;
    transform: translateX(-50%) translateY(0) !important;
    height: calc(100% - ${space('xxxl')});

    & > div {
      height: 100%;
    }
  }
`;

const FullscreenMediaGallery = ({
  images, sizes, videos, currentSlide, isOpen, onClose, onSlideChange, helpfulQty,
}) => {
  const header = useMemo(() => (
    <>
      <Block textAlign="left">
        <Button
          px="s"
          display="none"
          color="black.base"
          width="max-content"
          variant="neutral"
          onClick={null}
        >
          <Flex align="center" justifyContent="center">
            <ThumbsUp color={`${helpfulQty ? 'slate' : 'black'}.base`} />
            <Block display="none" ml="xs" sx$tablet={{ display: 'block' }}>
              {`Helpful${helpfulQty ? `  · ${helpfulQty}` : ''}`}
            </Block>
          </Flex>
        </Button>
      </Block>
      <Block font="body-m" color="white.base" textAlign="center">{`${currentSlide + 1} of ${images.length}`}</Block>
    </>
  ), [helpfulQty, currentSlide, images]);

  const bottomCenteredSection = (slide) => {
    if (slide.type === 'video') {
      return null;
    }
    return (
      <Block
        sx={{
          background: sx`${color('slate.base')}80`,
          color: 'slate.lighter-80',
          fontSize: 'body-xs',
          padding: 'xxxs xxs',
          width: 'max-content',
          mx: 'auto',
        }}
      >
        This image may be subject to copyright
      </Block>
    );
  };

  return (
    <StyledModal
      isOpen={isOpen}
      layout="gallery"
      closeable
      onClose={onClose}
      sx={{ width: '100% !important' }}
      header={header}
    >
      <MediaGallery
        currentSlide={currentSlide}
        images={images}
        sizes={sizes}
        videos={videos}
        bottomCenteredSection={bottomCenteredSection}
        onSlideChange={onSlideChange}
        onClick={onClose}
        transparent
        inModal
        placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      />
    </StyledModal>
  );
};

FullscreenMediaGallery.propTypes = {
  isOpen: PropTypes.bool,
  currentSlide: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    description: PropTypes.string,
  })),
  sizes: string,
  videos: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })),
    name: PropTypes.string.isRequired,
    thumbPath: PropTypes.string.isRequired,
  })),
  onClose: PropTypes.func.isRequired,
  ariaHideApp: PropTypes.bool,
  onSlideChange: PropTypes.func.isRequired,
  helpfulQty: PropTypes.number,
};

FullscreenMediaGallery.defaultProps = {
  isOpen: true,
  images: [],
  videos: [],
  currentSlide: 0,
  helpfulQty: 0,
};

export default FullscreenMediaGallery;
