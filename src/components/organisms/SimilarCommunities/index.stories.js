import React from 'react';
import { storiesOf } from '@storybook/react';

import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunities', module).add('default', () => (
  <SimilarCommunities similarProperties={similarProperties} />
));
