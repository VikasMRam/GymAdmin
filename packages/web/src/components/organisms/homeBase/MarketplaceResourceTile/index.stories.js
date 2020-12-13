import React from 'react';
import { storiesOf } from '@storybook/react';

import MarketplaceResourceTile from '.';

import ALArticle from 'sly/storybook/sample-data/marketplace-resource-al-article.json';
import MPOffer from 'sly/storybook/sample-data/marketplace-resource-mp-offer.json';

storiesOf('Organisms|MarketplaceResourceTile', module)
  .add('default', () => <div style={{ padding: '100px' }}> <MarketplaceResourceTile marketplaceResource={ALArticle} /></div>)
  .add('defaultRow', () => <div ><MarketplaceResourceTile layout="row" marketplaceResource={MPOffer} /></div>)
  .add('defaultMaxWidth', () => <div style={{ maxWidth: '380px' }}><MarketplaceResourceTile marketplaceResource={MPOffer} /></div>);

