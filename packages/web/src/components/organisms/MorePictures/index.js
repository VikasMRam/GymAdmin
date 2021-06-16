import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';

import { color, Grid, Image, sx } from "sly/common/system";
import Block from "sly/common/system/Block";

export default function MorePictures({ images = [], onPictureClick }) {
  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gridGap="xs"
      sx$laptop={{
        gridTemplateColumns: 'repeat(4, 1fr)'
      }}
    >
      {images.map((image, i) => (
        <Image
          key={image.id}
          onClick={() => onPictureClick(image, i)}
          path={image.path}
          aspectRatio="3:2"
          alt={image.alt}
          sizes="(max-width: 727px) 100vw, (max-width: 1079px) 334px, 250px"
          suorces={[
            138,
            186,
            250,
            334,
          ]}
          loading="lazy"
          border="box"
        >
          <Block
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              '&:hover': {
                backgroundColor: sx`${color('black.base')}33`,
                cursor: 'pointer',
              }
            }}
          />
        </Image>
      ))}
    </Grid>
  );
}

MorePictures.propTypes = {
  images: arrayOf(
    shape({
      id: string.isRequired,
      path: string.isRequired,
      alt: string.isRequired,
      description: string,
    }),
  ),
  onPictureClick: func.isRequired,
};
