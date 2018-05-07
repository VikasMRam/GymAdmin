import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityFilterList from '.';

const {
  id,
  name,
  startingRate,
  mainImage,
  address,
  similarProperties,
} = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunityFilterList', module).add('default', () => (
  <CommunityFilterList
    id={id}
    name={name}
    startingRate={startingRate}
    mainImage={mainImage}
    address={address}
    similarProperties={similarProperties}
  />
));
