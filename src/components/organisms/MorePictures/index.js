import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import { Lazy } from 'react-lazy';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  > *:hover {
    cursor: ${ifProp('hasOnPictureClick', 'pointer', 'initial')};
  }

  display: grid;
  grid-gap: ${size('mobileLayout.gutter')};
  grid-template-columns: auto auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-gap: ${size('tabletLayout.gutter')};
    grid-template-columns: ${size('tabletLayout.col4')} ${size('tabletLayout.col4')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: ${size('layout.col3')} ${size('layout.col3')} ${size('layout.col3')} ${size('layout.col3')};
  }
`;

const MorePictures = ({
  gallery, communityName, city, state, onPictureClick,
}) => {
  const { images } = gallery;
  const imageComponents = images.map((image, i) => (
    <Lazy
      ltIE9
      component="div"
      key={image.id}
      onClick={() => onPictureClick && onPictureClick(image)}
    >
      <Image src={image.hd} aspectRatio="4:3" alt={`${communityName} ${city} ${state} ${i + 1}`} />
    </Lazy>
  ));
  return (
    <Wrapper hasOnPictureClick={onPictureClick}>
      {imageComponents}
    </Wrapper>
  );
};

MorePictures.propTypes = {
  gallery: shape({
    images: arrayOf(shape({
      id: string.isRequired,
      sd: string.isRequired,
    })),
  }),
  communityName: string.isRequired,
  city: string,
  state: string,
  onPictureClick: func,
};

export default MorePictures;
