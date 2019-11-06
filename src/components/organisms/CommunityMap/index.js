import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { Marker, InfoWindow } from 'react-google-maps';

import { size } from 'sly/components/themes';
import Map from 'sly/components/atoms/Map';
import MapTile from 'sly/components/molecules/MapTile';
import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const Wrapper = styled.article`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: ${size('picture.ratios', '4:3')};
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    height: unset;
    padding-top: unset;
  }
`;

const MapContainerElement = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    position: unset;
    height: ${size('map.propertyDetail.regular.height')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    height: ${size('map.propertyDetail.large.height')};
  }
`;

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

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
      startingRate: number.isRequired,
      imageUrl: string.isRequired,
      latitude: number.isRequired,
      longitude: number.isRequired,
    })),
    className: string,
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
      className,
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

    similarProperties.forEach((prop) => {
      const {
        id,
        imageUrl,
        name,
        startingRate,
        reviewsValue,
        numReviews,
        latitude,
        longitude,
        url,
      } = prop;
      markers.push({
        id,
        community: {
          id,
          mainImage: imageUrl,
          name,
          startingRate,
          propRatings: { reviewsValue, numReviews },
          url,
        },
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
      <Wrapper className={className}>
        <Map
          center={center}
          defaultZoom={defaultZoom}
          containerElement={<MapContainerElement />}
        >
          {markerComponents}
        </Map>
      </Wrapper>
    );
  }
}

export default CommunityMap;
