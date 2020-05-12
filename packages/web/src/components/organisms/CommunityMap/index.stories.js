import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityMap from 'sly/components/organisms/CommunityMap';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const {
  similarProperties,
} = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunityMap', module).add('default', () => (
  <CommunityMap
    community={RhodaGoldmanPlaza}
    similarProperties={similarProperties}
  />
));