import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';

import { color, Grid, Image, sx, Heading, sx$tablet } from 'sly/common/system';
import Block from 'sly/common/system/Block';

const ImageItem = ({ image, i,  onPictureClick }) => {
  return (
    <Image
      key={image.id}
      onClick={() => onPictureClick(image, i, onPictureClick)}
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
      border="round"
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
          },
        }}
      />
    </Image>
  );
};

export default function ImageByCategory({ images = [], onPictureClick }) {
  return (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      gridGap="m"
      sx$tablet={{
        gridGap: 'l',
      }}
    >
      {images.map((image, i) => {
        if (image.category.id === '1') {
          return (
            <Block
              gridColumn="1 / -1"
              gridRow="1 / -1"
            >
              <ImageItem image={image} i={i} onPictureClick={onPictureClick} />
              <Heading paddingTop="xs" as="h3" font="title-s">{image.category.name}</Heading>
            </Block>
          );
        }
        return (
          <Block>
            <ImageItem image={image} i={i} onPictureClick={onPictureClick} />
            <Heading paddingTop="xs" as="h3" font="title-s">{image.category.name}</Heading>
          </Block>
        );
      })}
    </Grid>
  );
}

ImageByCategory.propTypes = {
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
