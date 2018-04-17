import React from 'react';
import { storiesOf } from '@storybook/react';
import CommunityTile from '.';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

const props = {
  selectable: true,
  community: {
    name: similarProperty.name,
    picture: similarProperty.mainImage,
    startingRate: similarProperty.startingRate,
    rating: 3.5,
    numReviews: 50,
  },
};

storiesOf('Molecules|CommunityTile', module)
  .add('default', () => <CommunityTile {...props} />)
  .add('Selected', () => (
    <CommunityTile similarProperty={similarProperty} selectable />
  ));
