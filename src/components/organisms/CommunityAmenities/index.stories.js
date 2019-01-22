import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityAmenities from 'sly/components/organisms/CommunityAmenities';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const noInfoCommunity = {
  ...RhodaGoldmanPlaza,
  propInfo: {},
};

storiesOf('Organisms|CommunityAmenities', module)
  .add('default', () => (
    <CommunityAmenities
      community={RhodaGoldmanPlaza}
    />
  ))
  .add('no data', () => (
    <CommunityAmenities
      community={noInfoCommunity}
    />
  ));