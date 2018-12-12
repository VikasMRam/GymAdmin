import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityFloorPlanListItem from 'sly/components/molecules/CommunityFloorPlanListItem';

const onItemClick = action('onItemClick');

storiesOf('Molecules|CommunityFloorPlanListItem', module)
  .add('default', () => (
    <CommunityFloorPlanListItem
      onInquireOrBookClicked={onItemClick}
      typeOfCare="Assisted Living"
      price={7900}
      priceType="Monthly Rate"
      roomType="Shared"
      shareType="Private"
    />
  ))
  .add('with Image', () => (
    <CommunityFloorPlanListItem
      image="https://d1qiigpe5txw4q.cloudfront.net/uploads/c12040412664de0a0c9443dc952ba53b/63047_SunriseofSanMateo_SanMateo_CA_AptBed_sd.jpg"
      onInquireOrBookClicked={onItemClick}
      typeOfCare="Assisted Living"
      price={7900}
      priceType="Monthly Rate"
      roomType="Shared"
      shareType="Private"
    />
  ));
