import React from 'react';
import { storiesOf } from '@storybook/react';

import SimilarCommunities from 'sly/components/organisms/SimilarCommunities';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunities', module)
  .add('default', () => <SimilarCommunities communities={similarProperties} />)
  .add('with imageSize', () => <SimilarCommunities communities={similarProperties} communityStyle={{ imageSize: 'little' }} />);

