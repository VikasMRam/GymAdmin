import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityMediaGallery from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { name, gallery } = RhodaGoldmanPlaza;
const { images } = gallery;

storiesOf('Organisms|CommunityMediaGallery', module)
  .add('default', () => <CommunityMediaGallery communityName={name} images={images} />);
