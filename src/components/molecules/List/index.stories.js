import React from 'react';
import { storiesOf } from '@storybook/react';

import List from '.';

const columns = 2;
const heading = 'Test List';
const items = ['item1', 'item2', 'item3', 'item4'];

storiesOf('Molecules|List', module)
  .add('default', () => <List heading={heading} columns={columns} items={items} />);
