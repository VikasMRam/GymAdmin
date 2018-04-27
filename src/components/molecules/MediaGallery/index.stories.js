import React from 'react';
import { storiesOf } from '@storybook/react';

import MediaGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery, videoGallery, } = RhodaGoldmanPlaza;
const { images } = gallery;
const galleryImages = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.hd;
  newImg.alt = `${name} ${i + 1}`;
  return newImg;
});

storiesOf('Molecules|MediaGallery', module)
  .add('default', () => <MediaGallery images={galleryImages} />);
