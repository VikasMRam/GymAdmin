import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, func } from 'prop-types';
import { Lazy } from 'react-lazy';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import PictureTile from 'sly/components/molecules/PictureTile';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    width: 100%;
    margin-bottom: ${size('spacing.xLarge')};
    line-height: 0;
    background-color: ${palette('grayscale', 1)};
  }
  > *:hover {
    cursor: ${ifProp('hasOnPictureClick', 'pointer', 'initial')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > * {
      width: auto;
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > *:nth-child(2n) {
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(4n) {
      margin-right: 0;
    }
  }
`;

const MorePictures = ({ gallery, communityName, city, state, onPictureClick }) => {
  const { images } = gallery;
  const imageComponents = images.map((image, i) => (
    <Lazy
      ltIE9
      component="div"
      key={image.id}
      onClick={() => onPictureClick && onPictureClick(image)}
    >
      <PictureTile src={image.hd} aspectRatio="4:3" alt={`${communityName} ${city} ${state} ${i + 1}`} />
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
