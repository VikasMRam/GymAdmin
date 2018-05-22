import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import CommunityMap from '.';

const {
  id,
  name,
  startingRate,
  mainImage,
  address,
  similarProperties,
} = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunityMap', module).add('default', () => (
  <CommunityMap
    community={RhodaGoldmanPlaza}
    similarProperties={similarProperties}
  />
));
