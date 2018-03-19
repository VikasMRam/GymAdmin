import React from 'react';
import { storiesOf } from '@storybook/react';
import CommunityTile from '.';

const community = {
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
  picture:
    'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
};

const communityWithRating = { ...community, rating: 3.5 };

storiesOf('Molecules|CommunityTile', module).add('default', () => (
  <CommunityTile community={communityWithRating} />
));
