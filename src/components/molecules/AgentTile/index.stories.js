import React from 'react';
import { storiesOf } from '@storybook/react';

import AgentTile from 'sly/components/molecules/AgentTile';

const aggregateRating = {
  ratingValue: 4.5,
  numRatings: 14,
};
const agentInfo = {
  displayName: 'Fonz Wasserstrom',
  slyPhone: '9258906575',
  recentFamilies: 17,
  profileImgUrl: 'https://avatars.githubusercontent.com/u/113003',
};

const agent = {
  aggregateRating,
  agentInfo,
};

storiesOf('Molecules|AgentTile', module)
  .add('default', () => <AgentTile agent={agent} />);
