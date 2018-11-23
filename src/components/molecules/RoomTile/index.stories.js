import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RoomTile from '.';

const onInquireOrBookClicked = () => {
  action('open book modal');
};

storiesOf('Molecules|RoomTile', module)
  .add('default', () => (<RoomTile onInquireOrBookClicked={onInquireOrBookClicked} price={4900} priceType="Monthly Rate" roomType="Shared" shareType="Private" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/c12040412664de0a0c9443dc952ba53b/63047_SunriseofSanMateo_SanMateo_CA_AptBed_sd.jpg" />))
  .add('no image', () => (<RoomTile onInquireOrBookClicked={onInquireOrBookClicked} price={7900} priceType="Monthly Rate" roomType="Shared" shareType="Private" />));
