import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';

import { size } from 'sly/components/themes';
import PictureTile from 'sly/components/molecules/PictureTile';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    column-count: 2;
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    column-count: 4;
  }
`;

const MorePictures = ({ gallery }) => {
  const { images } = gallery;
  const imageComponents = images.map(image => (
    <PictureTile src={image.sd} key={image.id} />
  ));
  return <Wrapper>{imageComponents}</Wrapper>;
};

MorePictures.propTypes = {
  gallery: shape({
    id: string.isRequired,
    sd: string.isRequired,
  }),
};

export default MorePictures;
