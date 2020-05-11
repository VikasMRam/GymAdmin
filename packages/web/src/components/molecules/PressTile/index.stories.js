import React from 'react';
import { storiesOf } from '@storybook/react';

import { assetPath } from 'sly/components/themes';
import PressTile from 'sly/components/molecules/PressTile';

const props = {
  text: `Seniorly is launching a new tool designed to make booking a short-term stay in an assisted living
    community as easy as booking a room on a site like Hotels.com or Airbnb`,
  imageUrl: assetPath('images/press/sf-chronicle.png'),
};
storiesOf('Molecules|PressTile', module)
  .add('default', () => (
    <PressTile {...props} />
  ));
