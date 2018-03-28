import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RCBModal from '.';

const user = {
  name: 'Ashley Clark',
};

const community = {
  id: 'rhoda-goldman-plaza',
  name: 'Rhoda Goldman Plaza',
  uri: '/assisted-living/california/san-francisco/rhoda-goldman-plaza',
  picture:
    'https://d1qiigpe5txw4q.cloudfront.net/uploads/19898cec23e2a814366385f3488c29be/Vintage-Golden-Gate_San-Francisco_Assisted-Living_Original-16_hd.jpg',
  rating: 3.5,
};

const communities = [community, community, community, community];
const tags = ['shared room', 'alzheirmer\'s', 'san francisco'];

storiesOf('Organisms|RCBModal', module)
  .add('default', () => (
    <RCBModal
      user={user}
      community={community}
      onClose={action('close')}
      onSubmit={action('submit')}
      isOpen
    />
  ))
  .add('similarCommunities', () => (
    <RCBModal
      tags={tags}
      communities={communities}
      currentStep="similarCommunities"
      onClose={action('close')}
      onSubmit={action('submit')}
      isOpen
    />
  ))
  .add('thankyou', () => ( 
    <RCBModal
      currentStep="thankyou"
      onClose={action('close')}
      onSubmit={action('submit')}
      isOpen
    />
  ));
