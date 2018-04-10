import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CareServicesList from '.';

const { data } = RhodaGoldmanPlaza;
const { attributes } = data;
const { name, propInfo } = attributes;
const { careServices, serviceHighlights } = propInfo;

storiesOf('Organisms|CareServicesList', module).add('default', () => (
  <CareServicesList
    careServices={careServices}
    serviceHighlights={serviceHighlights}
    propertyName={name}
  />
));
