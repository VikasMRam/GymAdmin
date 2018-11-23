import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Molecules|CommunityInfo', module)
  .add('default', () => <CommunityInfo community={RhodaGoldmanPlaza} />)
  .add('with palette', () => <CommunityInfo community={RhodaGoldmanPlaza} palette="danger" />);
