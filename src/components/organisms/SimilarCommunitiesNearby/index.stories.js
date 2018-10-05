import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SimilarCommunitiesNearby from '.';

const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunitiesNearby', module)
  .add('default', () => (
    <SimilarCommunitiesNearby similarCommunities={similarProperties} communitiesPerRow={3} />
  ));
