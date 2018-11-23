import React from 'react';
import { storiesOf } from '@storybook/react';

import SimilarCommunitiesNearby from 'sly/components/organisms/SimilarCommunitiesNearby';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';


const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunitiesNearby', module)
  .add('default', () => (
    <SimilarCommunitiesNearby similarCommunities={similarProperties} communitiesPerRow={3} />
  ));
