import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

import MapTile from '.';

const { similarProperties } = RhodaGoldmanPlaza;
const tileInfo = similarProperties[0];

const onInquireOrBookClicked = () => {
  alert('on Click of MapTile');
};

storiesOf('Molecules|MapTile', module).add('default', () => (
  <MapTile
    onClick={onInquireOrBookClicked}
    tileInfo={tileInfo}
  />
));
