import React from 'react';
import { storiesOf } from '@storybook/react';

import CarouselImageGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery, videoGallery, } = RhodaGoldmanPlaza;
const { images } = gallery;

storiesOf('Molecules|CarouselImageGallery', module)
  .add('default', () => <CarouselImageGallery propertyName={name} images={images} />);
