import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/components/rhoda_goldman_plaza.json';

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
