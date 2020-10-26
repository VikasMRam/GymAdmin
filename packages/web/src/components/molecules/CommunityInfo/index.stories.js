import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityInfo from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Molecules|CommunityInfo', module)
  .add('default', () => <CommunityInfo community={RhodaGoldmanPlaza} />)
  .add('with inverted', () => <CommunityInfo background="slate" community={RhodaGoldmanPlaza} inverted />);
