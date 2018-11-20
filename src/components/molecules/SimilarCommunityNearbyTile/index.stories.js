import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SimilarCommunityNearbyTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[1];

storiesOf('Molecules|SimilarCommunityNearbyTile', module)
  .add('default', () => (
    <SimilarCommunityNearbyTile
      image={similarProperty.imageUrl}
      name={similarProperty.name}
      typeOfCare={similarProperty.webViewInfo.firstLineValue}
      estimatedRate={similarProperty.estimated}
      startingRate={similarProperty.startingRate}
      reviewsValue={4.2}
    />
  ));
