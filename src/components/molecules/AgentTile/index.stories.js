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

const userFull = { name, picture, title, community };
const userNoTitle = { name, picture, community };
const userNothing = { name };
const userWithRating = { ...userFull, rating: 5 };

storiesOf('AgentTile', module)
  .add('default', () => <AgentTile user={userFull} />);

