import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import PropertyMap from '.';

const {
  id,
  name,
  startingRate,
  mainImage,
  address,
  similarProperties,
} = RhodaGoldmanPlaza;

storiesOf('Organisms|PropertyMap', module).add('default', () => (
  <PropertyMap
    id={id}
    name={name}
    startingRate={startingRate}
    mainImage={mainImage}
    address={address}
    similarProperties={similarProperties}
  />
));
