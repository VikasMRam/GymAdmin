import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

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
  'tabletLayout.col4'
)};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: ${size('layout.col3')} ${size('layout.col3')} ${size(
  'layout.col3'
)} ${size('layout.col3')};
  }
`;

export default function MorePictures({ images, onPictureClick }) {
  return (
    <Wrapper>
      {images.map((image, i) => (
        <Image
          key={image.id}
          onClick={() => onPictureClick(image, i)}
          src={image.src}
          aspectRatio="4:3"
          alt={image.alt}
        />
      ))}
    </Wrapper>
  );
}

MorePictures.propTypes = {
  images: arrayOf(
    shape({
      id: string.isRequired,
      src: string.isRequired,
      alt: string.isRequired,
    })
  ),
  onPictureClick: func.isRequired,
};
