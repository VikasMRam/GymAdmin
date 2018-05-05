import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Marker, InfoWindow } from 'react-google-maps';

import { isServer } from 'sly/config';
import { size } from 'sly/components/themes';
import Map from 'sly/components/atoms/Map';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

//TODO SEARCH MAP
const MapContainerElement = styled.div`
 width: 100%;
 
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
    
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: 75%;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

const InfoWindowDiv = styled.div`
  width: ${size('tile', 'small', 'width')};
  height: ${size('tile', 'small', 'height')};

  position: relative;
`;

const InfoWindowAnchor = styled.a``;

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
  background-color: ${palette('grayscale', 4)}B3; // 70% Opacity
  text-align: right;
  height: 22px;
  width: 100%;
`;

class SearchMap extends Component {
  static propTypes = {
    latitude: number.isRequired,
    longitude: number.isRequired,
    communityList: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
      startingRate: number.isRequired,
      imageUrl: string.isRequired,
      latitude: number.isRequired,
      longitude: number.isRequired,

    })),
  };

  state = {
    activeInfoWindowId: null,
  };

  onMarkerClick = marker => () => {
    this.setState({
      activeInfoWindowId: marker.id,
    });
  };

  onInfoWindowCloseClick = () => {
    this.setState({
      activeInfoWindowId: null,
    });
  };

  getInfoWindowComponent = marker => () => {
    const component = (
      <div>
        <InfoWindowImg src={marker.image} />
        <InfoWindowPropertyName>{marker.name}</InfoWindowPropertyName>
        <InfoWindowPrice>Starting at ${marker.startingRate}</InfoWindowPrice>
      </div>
    );
    if (marker.clickable === true) {
      return (
        <InfoWindowAnchor href={`/community/${marker.id}`}>
          {component}
        </InfoWindowAnchor>
      );
    }
    return component;
  };

  render() {
    const {
      latitude,
      longitude,
      communityList,

    } = this.props;
    const center = {
      latitude,
      longitude,
    };
    const markers = [];

    if (isServer) return null;

    communityList.forEach((property) => {
      const {
        id, name, startingRate, imageUrl, latitude, longitude,
      } = property;
      markers.push({
        id,
        name,
        startingRate,
        latitude,
        longitude,
        image: imageUrl,
        icon: 'red',
        clickable: true,
      });
    });

    const markerComponents = markers.map((marker) => {
      const InfoWindowComponent = this.getInfoWindowComponent(marker);
      return (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          defaultIcon={iconMap[marker.icon]}
          onClick={this.onMarkerClick(marker)}
        >
          {this.state.activeInfoWindowId === marker.id && (
            <InfoWindow
              key={marker.id}
              onCloseClick={this.onInfoWindowCloseClick}
            >
              <InfoWindowDiv>
                <InfoWindowComponent />
              </InfoWindowDiv>
            </InfoWindow>
          )}
        </Marker>
      );
    });

    //TODO Move to constants and helpers for things like isMobile?
    const isMobile = window.innerWidth < 768;
    let defaultZoom = 14;
    if (isMobile) {
      defaultZoom = 13;
    }

    return (
      <Map
        center={center}
        defaultZoom={defaultZoom}
        containerElement={<MapContainerElement />}
      >
          {markerComponents}
      </Map>
    );
  }
}

export default SearchMap;
