import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MapTile from 'sly/web/components/molecules/MapTile';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

storiesOf('Molecules|MapTile', module).add('default', () => (
  <MapTile
    onClick={action('on Click of MapTile')}
    tileInfo={RhodaGoldmanPlaza}
  />
));
