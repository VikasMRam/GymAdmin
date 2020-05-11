import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricingComparison from 'sly/components/organisms/CommunityPricingComparison';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { address } = RhodaGoldmanPlaza;
// TODO: mock as USA until country becomes available
address.country = 'USA';

const RhodaGoldmanPlazaWithoutOther = JSON.parse(JSON.stringify(RhodaGoldmanPlaza)); // deep copy
RhodaGoldmanPlazaWithoutOther.rgsAux.estimatedPrice.homeCareMAverage = undefined;
RhodaGoldmanPlazaWithoutOther.rgsAux.estimatedPrice.adultDayAverage = undefined;

const RhodaGoldmanPlazaWithOnlyInHomeCare = JSON.parse(JSON.stringify(RhodaGoldmanPlaza)); // deep copy
RhodaGoldmanPlazaWithOnlyInHomeCare.rgsAux.estimatedPrice.adultDayAverage = undefined;

storiesOf('Organisms|CommunityPricingComparison', module)
  .add('default', () => <CommunityPricingComparison community={RhodaGoldmanPlaza} />)
  .add('without Compare to other care options', () => <CommunityPricingComparison community={RhodaGoldmanPlazaWithoutOther} />)
  .add('without only In-home care', () => <CommunityPricingComparison community={RhodaGoldmanPlazaWithOnlyInHomeCare} />);
