import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { assetPath } from 'sly/components/themes';
import DiscoverTile from 'sly/components/molecules/DiscoverTile';

const content = {
  badgeImageUrl: assetPath('images/how-it-works/discover-1.png'),
  badgeName: 'Families',
  badgeText: 'Find an assisted living community to love from our thousands of listings',
};

storiesOf('Molecules|DiscoverTile', module)
  .add('default', () => (
    <div style={{ padding: '50px' }}>
      <DiscoverTile content={content} onClick={action('Click on DiscoverTile')} />
    </div>
  ));
