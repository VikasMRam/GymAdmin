import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunitySummary from '.';

const {
  propInfo,
  startingRate,
  rgsAux,
  twilioNumber,
  phoneNumber,
  user,
  reviews,
} = RhodaGoldmanPlaza;
const {
  communityHighlights,
} = propInfo;

storiesOf('Organisms|CommunitySummary', module)
  .add('default', () => (
    <CommunitySummary
      twilioNumber={twilioNumber}
      phoneNumber={phoneNumber}
      user={user}
      amenityScore={rgsAux.amenityScore}
      startingRate={startingRate}
      communityHighlights={communityHighlights}
      reviews={reviews}
    />
  ));
