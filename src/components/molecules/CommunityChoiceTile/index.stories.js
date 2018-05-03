import React from 'react';
import { storiesOf } from '@storybook/react';

import parentCommunity from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import CommunityChoiceTile from '.';

const { similarProperties: { [0]: community } } = parentCommunity;

storiesOf('Molecules|CommunityChoiceTile', module)
  .add('default', () => <CommunityChoiceTile community={community} />)
  .add('selected', () => (
    <CommunityChoiceTile community={community} selected />
  ));
