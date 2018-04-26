import React from 'react';
import { storiesOf } from '@storybook/react';

import MediaGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery } = RhodaGoldmanPlaza;
const { images } = gallery;

storiesOf('Organisms|MediaGallery', module)
  .add('default', () => <MediaGallery communityName={name} images={images} />);
