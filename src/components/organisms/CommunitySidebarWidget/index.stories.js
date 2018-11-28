import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CommunitySidebarWidget from 'sly/components/organisms/CommunitySidebarWidget';

storiesOf('Organisms|CommunitySidebarWidget', module)
  .add('default', () => (
    <CommunitySidebarWidget
      price={4300}
      rating={3.6}
      onSATClick={action('onSATClick')}
      onGCPClick={action('onGCPClick')}
      onAQClick={action('onAQClick')}
    />
  ));
