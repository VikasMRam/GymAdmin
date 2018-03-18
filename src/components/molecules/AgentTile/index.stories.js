import React from 'react';
import { storiesOf } from '@storybook/react';
import AgentTile from '.';

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';
const title = 'Property Manager';
const community = {
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
};

const userFull = {
  name,
  picture,
  title,
};
const userNoTitle = { name, picture };
const userNothing = { name };
const userWithRating = { ...userFull, rating: 3.5 };

storiesOf('AgentTile', module)
  .add('default', () => <AgentTile user={userFull} community={community} />)
  .add('with nothing', () => <AgentTile user={userNothing} />)
  .add('with rating', () => <AgentTile user={userWithRating} community={community} />)
  .add('with on title', () => <AgentTile user={userNoTitle} community={community} />);
