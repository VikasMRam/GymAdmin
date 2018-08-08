import React from 'react';
import { storiesOf } from '@storybook/react';

import { assetPath } from 'sly/components/themes';
import DiscoverTile from '.';

const content = {
  badgeImageUrl: assetPath('images/how-it-works/discover-1.png'),
  badgeName: 'Families',
  badgeText: 'Find an assisted living community to love from our thousands of listings',
};

function onClick() {
  alert('Click on DiscoverTile');
}

storiesOf('Molecules|DiscoverTile', module)
  .add('default', () => (
    <div style={{
        padding: "50px",
    }}>
      <DiscoverTile content={content} onClick={onClick} />
    </div>
  ));
