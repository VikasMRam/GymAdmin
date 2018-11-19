import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityTile from 'sly/components/organisms/CommunityTile';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Organisms|CommunityTile', module)
  .add('Layout Mobile', () => <div style={{ width: '368px' }} ><CommunityTile community={RhodaGoldmanPlaza} /></div>)
  .add('Layout Contained', () => <div style={{ width: '368px' }} ><CommunityTile community={RhodaGoldmanPlaza} layout="contained" /></div>);
