import React from 'react';
import { storiesOf } from '@storybook/react';

import ChecklistTile from '.';

import ALArticle from 'sly/storybook/sample-data/marketplace-resource-al-article.json';
import MPOffer from 'sly/storybook/sample-data/marketplace-resource-mp-offer.json';

const itemList = [{ checked: true, text: 'Item 1 is here' }, { checked: true, text: 'Item 2 is here' },
  { checked: false, text: 'Item 3 is here' }, { checked: false, text: 'Item 4 is here' }];
storiesOf('Organisms|ChecklistTile', module)
  .add('default', () => <div style={{ padding: '100px' }}> <ChecklistTile itemList={itemList} /></div>);

