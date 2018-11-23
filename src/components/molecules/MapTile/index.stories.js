import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import MapTile from '.';

const onInquireOrBookClicked = () => {
  action('on Click of MapTile');
};

storiesOf('Molecules|MapTile', module).add('default', () => (
  <MapTile
    onClick={onInquireOrBookClicked}
    tileInfo={RhodaGoldmanPlaza}
  />
));
