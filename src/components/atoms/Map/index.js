import React from 'react';
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

import mapsTheme from 'sly/components/themes/maps';
import { gMapsApiKey } from 'sly/config';

const mapOptions = {
  styles: mapsTheme.propertyDetailTheme,
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
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    // containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(
  ({
    defaultZoom,
    children,
    zoomControl,
    fullscreenControl,
    draggable,
    defaultCenter,
    onBoundsChanged,
    onMapMounted,
    onCenterChanged,
    onIdle,
    onDragStart,
  }) => {
    mapOptions.zoomControl = zoomControl;
    mapOptions.fullscreenControl = fullscreenControl;
    mapOptions.draggable = draggable;

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        // refresh map when center changes
        defaultCenter={defaultCenter}
        defaultOptions={mapOptions}
        onBoundsChanged={onBoundsChanged}
        onCenterChanged={onCenterChanged}
        onIdle={onIdle}
        onDragStart={onDragStart}
        ref={onMapMounted}
      >
        {children}
      </GoogleMap>
    );
  }
);

export default Map;
