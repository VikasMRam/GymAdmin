import React, { Component } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Marker, InfoWindow } from 'react-google-maps';

import { size } from 'sly/components/themes';
import Map from 'sly/components/atoms/Map';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

const InfoWindowDiv = styled.div`
  width: ${size('tile', 'small', 'width')};
  height: ${size('tile', 'small', 'height')};

  position: relative;
`;

const InfoWindowImg = styled.img`
  width: 100%;
  height: 100%;
`;

const InfoWindowPropertyName = styled.h4`
  color: white;
  font-size: ${size('text', 'subtitle')};

  position: absolute;
  z-index: 3;
  left: 0px;
  top: 0px;
  width: 100%;
`;

const InfoWindowPrice = styled.div`
  color: white;
  font-size: ${size('text', 'subtitle')};

  position: absolute;
  z-index: 3;
  right: 0px;
  bottom: 0px;
  background-color: rgba(104, 116, 122, 0.7);
  text-align: right;
  height: 22px;
  width: 100%;
`;

class PropertyMap extends Component {
  state = {
    activeInfoWindowId: null,
  };

  onMarkerClick = marker => () => {
    this.setState({
      activeInfoWindowId: marker.id,
    });
  };

  render() {
    const {
      id,
      name,
      startingRate,
      mainImage,
      address,
      similarProperties,
    } = this.props;
    const { latitude, longitude } = address;
    const center = {
      latitude,
      longitude,
    };
    const markers = [
      {
        id,
        name,
        startingRate,
        latitude,
        longitude,
        image: mainImage,
        icon: 'blue',
      },
    ];
    similarProperties.forEach((property) => {
      const {
        id, name, startingRate, mainImage, address,
      } = property;
      const { latitude, longitude } = address;
      markers.push({
        id,
        name,
        startingRate,
        latitude,
        longitude,
        image: mainImage,
        icon: 'red',
      });
    });

    return (
      <Map center={center} defaultZoom={13} markers={markers}>
        {markers.length > 0 &&
          markers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              defaultIcon={iconMap[marker.icon]}
              onClick={this.onMarkerClick(marker)}
            >
              {this.state.activeInfoWindowId === marker.id && (
                <InfoWindow key={marker.id}>
                  <InfoWindowDiv>
                    <InfoWindowImg src={marker.image} />
                    <InfoWindowPropertyName>
                      {marker.name}
                    </InfoWindowPropertyName>
                    <InfoWindowPrice>
                      Starting at ${marker.startingRate}
                    </InfoWindowPrice>
                  </InfoWindowDiv>
                </InfoWindow>
              )}
            </Marker>
          ))}
      </Map>
    );
  }
}

export default PropertyMap;
