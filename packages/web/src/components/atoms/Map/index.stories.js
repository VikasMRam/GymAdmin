import React from 'react';
import { storiesOf } from '@storybook/react';
import { Marker } from 'react-google-maps';

import Map from 'sly/web/components/atoms/Map';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { address, similarProperties } = RhodaGoldmanPlaza;
const { latitude, longitude } = address;
const center = {
  latitude,
  longitude,
};

const markers = [{ latitude, longitude }];

similarProperties.forEach((property) => {
  const { latitude, longitude } = property;
  markers.push({ latitude, longitude });
});

const DEFAULT_ZOOM = 13;

storiesOf('Atoms|Map', module)
  .add('default', () => <Map center={center} defaultZoom={DEFAULT_ZOOM} containerElement={<div style={{ height: '400px' }} />} />)
  .add('with Single Marker', () => (
    <Map center={center} defaultZoom={DEFAULT_ZOOM} containerElement={<div style={{ height: '400px' }} />}>
      <Marker position={{ lat: center.latitude, lng: center.longitude }} />
    </Map>
  ))
  .add('with Muliple Markers', () => (
    <Map center={center} defaultZoom={DEFAULT_ZOOM} containerElement={<div style={{ height: '400px' }} />}>
      {markers.map(marker => (
        <Marker position={{ lat: marker.latitude, lng: marker.longitude }} />
      ))}
    </Map>
  ));
