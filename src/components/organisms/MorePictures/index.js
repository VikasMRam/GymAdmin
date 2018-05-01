import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';

import { size } from 'sly/components/themes';
import PictureTile from 'sly/components/molecules/PictureTile';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // To Display 2 Tile per Row
    display: flex;
    flex-wrap: wrap;

    > div {
      flex-grow: 1;
      width: 50%;
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    // To Display 4 Tile per Row
    display: flex;
    flex-wrap: wrap;

    > div {
      flex-grow: 1;
      width: 25%;
    }
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
    images: arrayOf(shape({
      id: string.isRequired,
      sd: string.isRequired,
    })),
  }),
};

export default MorePictures;
