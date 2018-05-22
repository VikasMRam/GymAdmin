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

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    > *:nth-child(2n) {
      margin-right: ${size('spacing.xLarge')};
    }
    > *:nth-child(4n) {
      margin-right: 0;
    }
  }
`;

const MorePictures = ({ gallery, onPictureClick }) => {
  const { images } = gallery;
  const imageComponents = images.map(image => (
    <Lazy
      component="div"
      ltIE9
      key={image.id}
      onClick={() => onPictureClick && onPictureClick(image)}
    >
      <PictureTile src={image.sd} aspectRatio="4:3" />
    </Lazy>
  ));
  return <Wrapper hasOnPictureClick={onPictureClick}>{imageComponents}</Wrapper>;
};

MorePictures.propTypes = {
  gallery: shape({
    images: arrayOf(shape({
      id: string.isRequired,
      sd: string.isRequired,
    })),
  }),
  onPictureClick: func,
};

export default MorePictures;
