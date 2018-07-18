import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityLocalDetails from '.';

const {
  rgsAux
} = RhodaGoldmanPlaza;


storiesOf('Organisms|CommunityLocalDetails', module)
  .add('fullDisplay', () => (
    <CommunityLocalDetails
      localDetails={rgsAux.localDetails}
    />
  ))
