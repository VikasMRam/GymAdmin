import React from 'react';
import { storiesOf } from '@storybook/react';

import PricingAndAvailability from '.';

const sharedRoom = {
  price: 4900,
  img: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
};
const privateRoom = {
  price: 5295,
  img: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
};
const oneBedRoom = {
  price: 6100,
  img: 'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
};
const priceComparison = [
  {
    locality: 'City',
    price: 5900
  },
  {
    locality: 'USA',
    price: 3600
  },
  {
    locality: 'Rhoda Golman Plaza',
    price: 5295
  },
  {
    locality: 'CA',
    price: 4000
  },
];
const estimatedCost = {
  from: 3859,
  to: 4708
};
const communityName = 'Rhoda Golman Plaza';
const onGetDetailedPricingClicked = () => {
  alert('open modal');
};
const onInquireOrBookClicked = () => {
  alert('open book modal');
};

storiesOf('Organisms|PricingAndAvailability', module)
  .add('default', () => <PricingAndAvailability communityName={communityName} sharedRoom={sharedRoom} privateRoom={privateRoom} oneBedRoom={oneBedRoom} priceComparison={priceComparison} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('onlyPrivateRoom', () => <PricingAndAvailability communityName={communityName} privateRoom={privateRoom} priceComparison={priceComparison} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('onlyPrivateRoomAndOneBedroom', () => <PricingAndAvailability communityName={communityName} privateRoom={privateRoom} oneBedRoom={oneBedRoom} priceComparison={priceComparison} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('noPriceComparison', () => <PricingAndAvailability communityName={communityName} sharedRoom={sharedRoom} privateRoom={privateRoom} oneBedRoom={oneBedRoom} onInquireOrBookClicked={onInquireOrBookClicked} />)
  .add('estimatedPricing', () => <PricingAndAvailability communityName={communityName} priceComparison={priceComparison} estimatedCost={estimatedCost} onGetDetailedPricingClicked={onGetDetailedPricingClicked} onInquireOrBookClicked={onInquireOrBookClicked} />);
