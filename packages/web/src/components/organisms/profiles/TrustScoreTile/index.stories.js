import React from 'react';
import { storiesOf } from '@storybook/react';

import TrustScoreTile from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

// const note = 'Location is great. This community is near my hosue, I can visit my mom in just a 20 minute drive. Big mood.';
const rgsAux = {
  rgsInfo: { trustScore: 95, scoreParams: { trustScore: 95, lastInspectionDate: new Date(), licensedDate: new Date()   } },
};
const RhodaGoldmanPlazaWithAll = { ...RhodaGoldmanPlaza, rgsAux };
// const RhodaGoldmanPlazaNoRating = { ...RhodaGoldmanPlaza, propRatings: { reviewsValue: 0 } };

storiesOf('Organisms|TrustScoreTile', module)
  .add('default', () => <div style={{ padding: '100px' }}> <TrustScoreTile community={RhodaGoldmanPlazaWithAll} /></div>)
  .add('defaultMaxWidth', () => <div style={{ maxWidth: '380px' }} ><TrustScoreTile community={RhodaGoldmanPlazaWithAll} /></div>)
  .add('noRgs', () => <div style={{ maxWidth: '380px' }} ><TrustScoreTile community={RhodaGoldmanPlaza} /></div>);
