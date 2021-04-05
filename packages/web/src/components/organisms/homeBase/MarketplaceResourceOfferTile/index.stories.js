import React from 'react';
import { storiesOf } from '@storybook/react';

import MarketplaceResourceContentTile from '.';

import ALArticle from 'sly/storybook/sample-data/marketplace-resource-al-article.json';
// import MPOffer from 'sly/storybook/sample-data/marketplace-resource-mp-offer.json';

storiesOf('Organisms|MarketplaceResourceOfferTile', module)
  .add('default', () => <div style={{ padding: '100px' }}> <MarketplaceResourceContentTile marketplaceResource={ALArticle} /></div>)
  .add('defaultRow', () => <div ><MarketplaceResourceContentTile layout="row" marketplaceResource={ALArticle} /></div>)
  .add('defaultMaxWidth', () => <div style={{ maxWidth: '380px' }}><MarketplaceResourceContentTile marketplaceResource={ALArticle} /></div>);

