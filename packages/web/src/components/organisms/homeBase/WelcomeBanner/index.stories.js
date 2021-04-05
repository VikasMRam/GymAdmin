import React from 'react';
import { storiesOf } from '@storybook/react';

import ChecklistTile from '.';


const itemList = [{ checked: true, text: 'Item 1 is here' }, { checked: true, text: 'Item 2 is here' },
  { checked: false, text: 'Item 3 is here' }, { checked: false, text: 'Item 4 is here' }];
storiesOf('Organisms|WellcomeBanner', module)
  .add('default', () => <div style={{ padding: '100px' }}> <ChecklistTile itemList={itemList} /></div>);

