import React from 'react';
import { storiesOf } from '@storybook/react';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import Map from '.';

const { address, similarProperties } = RhodaGoldmanPlaza;
const { latitude, longitude } = address;
const center = {
  latitude,
  longitude,
};

const markers = [{ latitude, longitude, icon: 'blue' }];

similarProperties.forEach((property) => {
  const { address } = property;
  const { latitude, longitude } = address;
  markers.push({ latitude, longitude, icon: 'red' });
});

storiesOf('Atoms|Map', module).add('default', () => (
  <Map center={center} defaultZoom={13} markers={markers} />
));
