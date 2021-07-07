import React from 'react';
import { storiesOf } from '@storybook/react';

import SimilarCommunities from 'sly/web/components/organisms/SimilarCommunities';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarCommunities } = RhodaGoldmanPlaza;

storiesOf('Organisms|SimilarCommunities', module)
  .add('default', () => <SimilarCommunities communities={similarCommunities.similar} />)
  .add('with imageSize', () => <SimilarCommunities communities={similarCommunities.similar} communityStyle={{ imageSize: 'little' }} />);

