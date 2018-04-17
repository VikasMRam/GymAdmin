import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

const props = {
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
  .add('Selectable', () => <CommunityTile {...props} selectable />)
  .add('Selectable Selected', () => (
    <CommunityTile {...props} selectable selected />
  ));
