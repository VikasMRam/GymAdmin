import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityChoiceTile from 'sly/components/molecules/CommunityChoiceTile';
import parentCommunity from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties: { 0: community } } = parentCommunity;

storiesOf('Molecules|CommunityChoiceTile', module)
  .add('default', () => (
    <CommunityChoiceTile community={community} selectable />
  ))
  .add('selected', () => (
    <CommunityChoiceTile community={community} selected selectable />
  ))
  .add('non selectable', () => (
    <CommunityChoiceTile community={community} selected />
  ));
