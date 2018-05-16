import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import { Lazy } from 'react-lazy';

import { size } from 'sly/components/themes';
import PictureTile from 'sly/components/molecules/PictureTile';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > div {
    margin-bottom: ${size('spacing.xLarge')};
    line-height: 0;
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    justify-content: space-between;
  }
`;

const MorePictures = ({ gallery }) => {
  const { images } = gallery;
  const imageComponents = images.map(image => (
    <Lazy component="div" ltIE9 key={image.id}>
      <PictureTile src={image.sd} />
    </Lazy>
  ));
  return <Wrapper>{imageComponents}</Wrapper>;
};

MorePictures.propTypes = {
  gallery: shape({
    images: arrayOf(shape({
      id: string.isRequired,
      sd: string.isRequired,
    })),
  }),
};

export default MorePictures;
