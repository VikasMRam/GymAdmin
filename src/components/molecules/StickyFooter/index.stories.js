import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import StickyFooter from '.';

storiesOf('Molecules|StickyFooter', module).add('default', () => (
  <StickyFooter community={RhodaGoldmanPlaza} />
));
