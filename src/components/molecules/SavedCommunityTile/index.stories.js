import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SavedCommunityTile from 'sly/components/molecules/SavedCommunityTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

storiesOf('Molecules|SavedCommunityTile', module)
  .add('default', () => (
    <SavedCommunityTile
      image={similarProperty.imageUrl}
      name={similarProperty.name}
      note="test note"
      onFavouriteClicked={action('favourite icon clicked')}
    />
  ))
  .add('without note', () => (
    <SavedCommunityTile
      image={similarProperty.imageUrl}
      name={similarProperty.name}
      onFavouriteClicked={action('favourite icon clicked')}
    />
  ));
