import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;
const similarProperty = similarProperties[0];

const onInquireOrBookClicked = () => {
  action('on Click of SimilarCommunityTile');
};

storiesOf('Molecules|SimilarCommunityTile', module).add('default', () => (
  <SimilarCommunityTile
    onClick={onInquireOrBookClicked}
    similarProperty={similarProperty}
  />
));
