import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import mapsTheme from 'sly/components/themes/maps';
import { gMapsApiKey } from 'sly/config';

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
  draggable: true,
};

const Map = compose(
  withProps({
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    // containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const {
    center, defaultZoom, children, zoomControl, fullscreenControl, draggable,
  } = props;
  const { latitude, longitude } = center;
  const {
    onBoundsChanged, onMapMounted, onCenterChanged, onIdle,
  } = props;
  const defaultCenter = { lat: latitude, lng: longitude };
  mapOptions.zoomControl = zoomControl;
  mapOptions.fullscreenControl = fullscreenControl;
  mapOptions.draggable = draggable;

  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      // refresh map when center changes
      center={defaultCenter}
      defaultOptions={mapOptions}
      onBoundsChanged={onBoundsChanged}
      onCenterChanged={onCenterChanged}
      onIdle={onIdle}
      ref={onMapMounted}
    >
      {children}
    </GoogleMap>
  );
});

export default Map;
