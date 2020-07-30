import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import styled from 'styled-components';

import { size, getKey } from 'sly/common/components/themes';
import { ResponsiveImage } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  > *:hover {
    cursor: pointer;
  }

  display: grid;
  grid-gap: ${size('mobileLayout.gutter')};
  grid-template-columns: auto auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-gap: ${size('tabletLayout.gutter')};
    grid-template-columns: ${size('tabletLayout.col4')} ${size(
  'tabletLayout.col4',
)};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: ${size('layout.col3')} ${size('layout.col3')} ${size(
  'layout.col3',
)} ${size('layout.col3')};
  }
`;

const thumbSizes = getKey('imageFormats.thumbGallery').sizes;

export default function MorePictures({ images = [], onPictureClick }) {
  return (
    <Wrapper>
      {images.map((image, i) => (
        <ResponsiveImage
          key={image.id}
          onClick={() => onPictureClick(image, i)}
          path={image.path}
          aspectRatio="4:3"
          alt={image.alt}
          sizes={thumbSizes}
          loading="lazy"
        />
      ))}
    </Wrapper>
  );
}

MorePictures.propTypes = {
  images: arrayOf(
    shape({
      id: string.isRequired,
      path: string.isRequired,
      alt: string.isRequired,
    }),
  ),
  onPictureClick: func.isRequired,
};
