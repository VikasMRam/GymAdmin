import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SimilarCommunity from '.';

const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunity', module).add('default', () => (
  <SimilarCommunity similarProperties={similarProperties} />
));
