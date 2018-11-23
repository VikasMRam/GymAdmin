import React from 'react';
import { storiesOf } from '@storybook/react';

import CareServicesList from 'sly/components/organisms/CareServicesList';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';


const { name, propInfo } = RhodaGoldmanPlaza;
const { careServices, serviceHighlights } = propInfo;

storiesOf('Organisms|CareServicesList', module).add('default', () => (
  <CareServicesList
    careServices={careServices}
    serviceHighlights={serviceHighlights}
    communityName={name}
  />
));
