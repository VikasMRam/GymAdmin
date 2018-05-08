import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Marker, InfoWindow } from 'react-google-maps';

import { isServer } from 'sly/config';
import { size } from 'sly/components/themes';
import Map from 'sly/components/atoms/Map';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import CommunityChoiceTile from 'sly/components/molecules/CommunityChoiceTile';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

// TODO SEARCH MAP
const MapContainerElement = styled.div`
  width: 100%;
  height: ${size('map.propertyDetail.large.height')};
`;

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};

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
  render() {
    const { latitude, longitude, communityList } = this.props;
    const center = {
      latitude,
      longitude,
    };
    const markers = [];

    // TODO Move to constants and helpers for things like isMobile?
    const isMobile = window.innerWidth < 768;
    let defaultZoom = 14;
    if (isMobile) {
      defaultZoom = 13;
    }

    if (isServer) return null;

    communityList.forEach((property) => {
      const {
        id,
        url,
        name,
        description,
        startingRate,
        imageUrl,
        numReviews,
        reviewsValue,
        latitude,
        longitude,
        webViewInfo,
      } = property;
      markers.push({
        id,
        url,
        name,
        description,
        typeCare: webViewInfo.firstLineValue.split(','),
        startingRate,
        numReviews,
        reviewsValue,
        latitude,
        longitude,
        image: imageUrl,
        icon: 'blue',
        clickable: true,
      });
    });

    const markerComponents = markers.map((marker) => {
      const {
        id,
        url,
        name,
        description,
        typeCare,
        startingRate,
        numReviews,
        reviewsValue,
        latitude,
        longitude,
        image,
      } = marker;
      const community = {
        id,
        name,
        startingRate,
        propInfo: {
          communityDescription: description,
          typeCare,
        },
        propRatings: {
          reviewsValue,
          numReviews,
        },
      };
      const communityForSmallTile = {
        name,
        url,
        picture: image,
        startingRate,
        propRatings: {
          reviewsValue,
          numReviews,
        },
      };
      let infoWindowTile = (
        <SimilarCommunityTile similarProperty={community} borderless />
      );
      if (isMobile) {
        infoWindowTile = (
          <CommunityChoiceTile community={communityForSmallTile} borderless />
        );
      }
      return (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          defaultIcon={iconMap[marker.icon]}
          onClick={this.onMarkerClick(marker)}
        >
          {this.state.activeInfoWindowId === marker.id && (
            // TODO : Remove Close Button
            <InfoWindow
              key={marker.id}
              onCloseClick={this.onInfoWindowCloseClick}
            >
              {infoWindowTile}
            </InfoWindow>
          )}
        </Marker>
      );
    });

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
