import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItem from '.';

storiesOf('Molecules|ListItem', module)
  .add('default', () => <ListItem text='Meal Preparation and Service' />)
