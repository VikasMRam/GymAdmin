import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityActions from 'sly/components/molecules/CommunityActions';

storiesOf('Molecules|CommunityActions', module)
  .add('default', () => (
    <CommunityActions onSATClick={action('onSATClick')} onGCPClick={action('onGCPClick')} />
  ))
  .add('with isAlreadyTourScheduled', () => (
    <CommunityActions isAlreadyTourScheduled onSATClick={action('onSATClick')} onGCPClick={action('onGCPClick')} />
  ))
  .add('with isAlreadyPricingRequested', () => (
    <CommunityActions isAlreadyPricingRequested onSATClick={action('onSATClick')} onGCPClick={action('onGCPClick')} />
  ));
