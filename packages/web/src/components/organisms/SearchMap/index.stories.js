import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchMap from 'sly/web/components/organisms/SearchMap';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const {
  id,
  name,
  startingRate,
  mainImage,
  address,
  propInfo,
  propRatings,
} = RhodaGoldmanPlaza;
const { latitude, longitude } = address;
const { reviewsValue, numReviews } = propRatings;
const { communityDescription, typeCare } = propInfo;
const community = {
  id,
  name,
  description: communityDescription,
  startingRate,
  imageUrl: mainImage,
  numReviews,
  reviewsValue,
  latitude,
  longitude,
  webViewInfo: {
    firstLineValue: typeCare.join(),
  },
};

storiesOf('Organisms|SearchMap', module).add('default', () => (
  <SearchMap
    latitude={latitude}
    longitude={longitude}
    communityList={[community]}
  />
));
