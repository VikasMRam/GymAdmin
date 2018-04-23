import React from 'react';
import { Marker } from 'react-google-maps';

import Map from 'sly/components/atoms/Map';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

const PropertyMap = (props) => {
  const { address, similarProperties } = props;
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
  return (
    <Map center={center} defaultZoom={13} markers={markers}>
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
    </Map>
  );
};

export default PropertyMap;
