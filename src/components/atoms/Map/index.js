import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import mapsTheme from 'sly/components/themes/maps';

const mapConfig = {
  theme: mapsTheme.propertyDetailTheme,
};

const mapOptions = {
  styles: mapConfig.theme,
  // zoom: 12,
  // center: this.centerLatLng,
  panControl: false,
  zoomControl: true,
  // zoomControlOptions: {
  //   style: google.maps.ZoomControlStyle.SMALL,
  // },
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  overviewMapControl: false,
  rotateControl: false,
  scrollwheel: false,
};

const Map = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { center, defaultZoom, children } = props;
  const { latitude, longitude } = center;
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultOptions={mapOptions}
    >
      {children}
    </GoogleMap>
  );
});

export default Map;
