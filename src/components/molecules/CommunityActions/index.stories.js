import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityActions from 'sly/components/molecules/CommunityActions';

storiesOf('Molecules|CommunityActions', module)
  .add('default', () => (
    <CommunityActions
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ))
  .add('with isAlreadyTourScheduled', () => (
    <CommunityActions
      isAlreadyTourScheduled
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ))
  .add('with isAlreadyPricingRequested', () => (
    <CommunityActions
      isAlreadyPricingRequested
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ));
