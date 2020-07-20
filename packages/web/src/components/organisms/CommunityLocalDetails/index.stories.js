import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityLocalDetails from 'sly/web/components/organisms/CommunityLocalDetails';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const {
  rgsAux,
} = RhodaGoldmanPlaza;


storiesOf('Organisms|CommunityLocalDetails', module)
  .add('fullDisplay', () => (
    <CommunityLocalDetails
      localDetails={rgsAux.localDetails}
    />
  ));
