import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunityStickyFooter from 'sly/components/organisms/CommunityStickyFooter';

storiesOf('Organisms|CommunityStickyFooter', module)
  .add('default', () => (
    <CommunityStickyFooter
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ))
  .add('with isAlreadyTourScheduled', () => (
    <CommunityStickyFooter
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
      isAlreadyTourScheduled
    />
  ))
  .add('with isAlreadyPricingRequested', () => (
    <CommunityStickyFooter
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
      isAlreadyPricingRequested
    />
  ));
