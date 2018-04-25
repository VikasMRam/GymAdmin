import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import PricingAndAvailability from '.';

const {
  name, address, rgsAux, floorPlans,
} = RhodaGoldmanPlaza;
const roomPrices = floorPlans.map(({ info }) => info);
// TODO: mock as USA until country becomes available
address.country = 'USA';
const onGetDetailedPricingClicked = () => {
  alert('open modal');
};
const onInquireOrBookClicked = () => {
  alert('open book modal');
};

storiesOf('Organisms|PricingAndAvailability', module)
  .add('default', () => <PricingAndAvailability communityName={name} roomPrices={roomPrices} address={address} estimatedPrice={rgsAux.estimatedPrice} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('noPriceComparison', () => <PricingAndAvailability communityName={name} roomPrices={roomPrices} address={address} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('estimatedPricing', () => <PricingAndAvailability communityName={name} address={address} estimatedPrice={rgsAux.estimatedPrice} onGetDetailedPricingClicked={onGetDetailedPricingClicked} onInquireOrBookClicked={onInquireOrBookClicked} />);
