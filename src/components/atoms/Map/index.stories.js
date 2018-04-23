import React from 'react';
import { storiesOf } from '@storybook/react';
import { Marker } from 'react-google-maps';

import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';
import Map from '.';

const { address, similarProperties } = RhodaGoldmanPlaza;
const { latitude, longitude } = address;
const center = {
  latitude,
  longitude,
};

const markers = [{ latitude, longitude }];

similarProperties.forEach((property) => {
  const { address } = property;
  const { latitude, longitude } = address;
  markers.push({ latitude, longitude });
});

storiesOf('Atoms|Map', module)
  .add('default', () => <Map center={center} defaultZoom={13} />)
  .add('with Single Marker', () => (
    <Map center={center} defaultZoom={13}>
      <Marker position={{ lat: center.latitude, lng: center.longitude }} />
    </Map>
  ))
  .add('with Muliple Markers', () => (
    <Map center={center} defaultZoom={13}>
      {markers.map(marker => (
        <Marker position={{ lat: marker.latitude, lng: marker.longitude }} />
      ))}
    </Map>
  ));
