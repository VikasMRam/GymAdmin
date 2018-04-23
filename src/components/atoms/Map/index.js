import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const mapConfig = {
  theme: [
    {
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#68747a',
        },
        {
          saturation: '0',
        },
        {
          lightness: '-42',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels.text.fill',
      stylers: [
        {
          lightness: '53',
        },
        {
          color: '#ffba00',
        },
        {
          saturation: '-54',
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          hue: '#ffbb00',
        },
        {
          saturation: '43',
        },
        {
          lightness: '38',
        },
        {
          gamma: '1.00',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          visibility: 'on',
        },
        {
          hue: '#00ff6a',
        },
        {
          saturation: '-28',
        },
        {
          lightness: '11',
        },
        {
          gamma: '1.00',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffba00',
        },
        {
          lightness: '37',
        },
        {
          saturation: '-24',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          lightness: '41',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry.stroke',
      stylers: [
        {
          lightness: '40',
        },
        {
          gamma: '1',
        },
        {
          saturation: '-10',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          lightness: '39',
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          hue: '#ff0000',
        },
        {
          saturation: '-100',
        },
        {
          lightness: '31',
        },
        {
          gamma: '1.00',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          lightness: '38',
        },
        {
          gamma: '1',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [
        {
          color: '#80badc',
        },
        {
          visibility: 'on',
        },
        {
          lightness: '17',
        },
      ],
    },
  ],
};

const mapOptions = {
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

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
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
  const { center, defaultZoom, markers } = props;
  const { latitude, longitude } = center;
  return (
    <GoogleMap
      defaultZoom={defaultZoom}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultOptions={{ styles: mapConfig.theme }}
      options={mapOptions}
    >
      {markers.length > 0 &&
        markers.map(marker => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            defaultIcon={iconMap[marker.icon]}
          >
            {/* <InfoWindow onCloseClick={props.onToggleOpen}>
              <div>Hello</div>
            </InfoWindow> */}
          </Marker>
        ))}
    </GoogleMap>
  );
});

export default Map;
