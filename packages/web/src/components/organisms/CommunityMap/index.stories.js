import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityMap from 'sly/web/components/organisms/CommunityMap';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const {
  similarCommunities,
} = RhodaGoldmanPlaza;

storiesOf('Organisms|CommunityMap', module).add('default', () => (
  <CommunityMap
    community={RhodaGoldmanPlaza}
    similarProperties={similarCommunities.similar}
  />
));
