import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Marker, InfoWindow } from 'react-google-maps';

import { isServer } from 'sly/config';
import { size } from 'sly/components/themes';
import Map from 'sly/components/atoms/Map';
import MapTile from 'sly/components/molecules/MapTile';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const MapContainerElement = styled.div`
  width: ${size('map.propertyDetail.small.width')};
  height: ${size('map.propertyDetail.small.height')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('map.propertyDetail.regular.width')};
    height: ${size('map.propertyDetail.regular.height')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: ${size('map.propertyDetail.large.width')};
    height: ${size('map.propertyDetail.large.height')};
  }
`;

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

const MapDiv = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

class CommunityMap extends Component {
  static propTypes = {
    community: shape({
      id: string.isRequired,
      name: string.isRequired,
      url: string.isRequired,
      address: shape({
        latitude: number.isRequired,
        longitude: number.isRequired,
      }).isRequired,
    }),
    similarProperties: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired,
      url: string.isRequired,
      address: shape({
        latitude: number.isRequired,
        longitude: number.isRequired,
      }).isRequired,
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

  render() {
    const {
      community,
      similarProperties,
    } = this.props;
    const { latitude, longitude } = community.address;
    const center = {
      latitude,
      longitude,
    };
    const markers = [
      {
        community,
        latitude,
        longitude,
        icon: 'red',
        clickable: false,
      },
    ];

    if (isServer) return null;

    similarProperties.forEach((prop) => {
      const { latitude, longitude } = prop.address;
      markers.push({
        id:prop.id,
        community: prop,
        latitude,
        longitude,
        icon: 'blue',
        clickable: true,
      });
    });

    const markerComponents = markers.map((marker) => {
      const {
        community,
      } = marker;
      const infoWindowTile = (
        <MapTile tileInfo={community} borderless />
      );
      return (
        <Marker
          key={community.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          defaultIcon={iconMap[marker.icon]}
          onClick={this.onMarkerClick(marker)}
        >
          {this.state.activeInfoWindowId === marker.id && (
            <InfoWindow
              key={community.id}
              onCloseClick={this.onInfoWindowCloseClick}
            >
              {infoWindowTile}
            </InfoWindow>
          )}
        </Marker>
      );
    });

    const isMobile = window.innerWidth < 768;
    let defaultZoom = 13;
    if (isMobile) {
      defaultZoom = 12;
    }

    return (

      <MapDiv>
        <article>
          <Map
            center={center}
            defaultZoom={defaultZoom}
            containerElement={<MapContainerElement />}
          >
            {markerComponents}
          </Map>
        </article>
      </MapDiv>
    );
  }
}

export default CommunityMap;
