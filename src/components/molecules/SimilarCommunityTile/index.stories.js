import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import SimilarCommunityTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

const onInquireOrBookClicked = () => {
  alert('on Click of SimilarCommunityTile');
};

storiesOf('Molecules|SimilarCommunityTile', module).add('default', () => (
  <SimilarCommunityTile
    onClick={onInquireOrBookClicked}
    similarProperty={similarProperty}
  />
));
