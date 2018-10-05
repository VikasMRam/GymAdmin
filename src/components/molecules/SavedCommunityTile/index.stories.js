import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SavedCommunityTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

storiesOf('Molecules|SavedCommunityTile', module)
  .add('default', () => (
    <SavedCommunityTile
      image={similarProperty.imageUrl}
      name={similarProperty.name}
      note="test note"
    />
  ))
  .add('without note', () => (
    <SavedCommunityTile
      image={similarProperty.imageUrl}
      name={similarProperty.name}
    />
  ));
