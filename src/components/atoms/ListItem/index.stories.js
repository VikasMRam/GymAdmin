import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItem from '.';

storiesOf('Atoms|ListItem', module)
  .add('default', () => <ListItem>Meal Preparation and Service</ListItem>)
