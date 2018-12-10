import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySidebarWidget from 'sly/components/organisms/CommunitySidebarWidget';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Organisms|CommunitySidebarWidget', module)
  .add('default', () => (
    <CommunitySidebarWidget
      community={RhodaGoldmanPlaza}
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ))
  .add('without price and rating', () => (
    <CommunitySidebarWidget
      onBookATourClick={action('onBookATourClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ));
