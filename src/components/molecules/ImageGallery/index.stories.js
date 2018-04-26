import React from 'react';
import { storiesOf } from '@storybook/react';

import ImageGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery, videoGallery, } = RhodaGoldmanPlaza;
const { images } = gallery;
const galleryImages = images.map((img, i) => {
  const newImg = img;
  newImg.src = img.hd;
  newImg.alt = `${name} ${i + 1}`;
  return newImg;
});

storiesOf('Molecules|ImageGallery', module)
  .add('default', () => <ImageGallery images={galleryImages} />);
