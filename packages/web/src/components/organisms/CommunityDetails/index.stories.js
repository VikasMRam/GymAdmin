import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityDetails from 'sly/web/components/organisms/CommunityDetails';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const noInfoCommunity = {
  ...RhodaGoldmanPlaza,
  propInfo: {},
};

storiesOf('Organisms|CommunityDetails', module)
  .add('default', () => (
    <CommunityDetails
      community={RhodaGoldmanPlaza}
    />
  ))
  .add('no data', () => (
    <CommunityDetails
      community={noInfoCommunity}
    />
  ));
