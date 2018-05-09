import React, { Component } from 'react';
import { string, number, shape, arrayOf, func } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { Marker, InfoWindow, OverlayView } from 'react-google-maps';

import { isServer } from 'sly/config';
import { size } from 'sly/components/themes';
import Checkbox from 'sly/components/molecules/Checkbox';
import Map from 'sly/components/atoms/Map';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import CommunityChoiceTile from 'sly/components/molecules/CommunityChoiceTile';

import GreenMarker from 'sly/../public/icons/greenmarker.png';
import RedMarker from 'sly/../public/icons/redmarker.png';

const MapContainerElement = styled.div`
  width: 100%;
  height: ${size('map.propertyDetail.large.height')};
`;

const StyledDiv = styled.div`
  position: fixed;
  top: -300px;
  left: -200px;
  background-color: ${palette('white', 0)};
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  width: auto;
  height: auto;
  padding: ${size('spacing.small')};
  display: flex;
`;

const OverlayText = styled.div`
  padding: calc(${size('spacing.regular')} + ${size('spacing.small')}) ${size('spacing.regular')};
`;

const StyledCheckbox = styled(Checkbox)`
  margin: ${size('spacing.regular')};
`;

const iconMap = {
  blue: GreenMarker,
  red: RedMarker,
};
const refs = {
  map: undefined,
};

function preciseCoordinate(x) {
  return Number.parseFloat(x).toPrecision(8);
}

class RedoSearchDiv extends Component {
  static propTypes = {
    latitude: number.isRequired,
    longitude: number.isRequired,
    redoSearchOnMove: func.isRequired,
    onToggleSearchOnMove: func.isRequired,
  }
  getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });
  render() {
    const { latitude, longitude, redoSearchOnMove, onToggleSearchOnMove } = this.props;
    return (
      <OverlayView
        position={{ lat: latitude, lng: longitude }}
        getPixelPositionOffset={this.getPixelPositionOffset}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <StyledDiv>
          <StyledCheckbox checked={redoSearchOnMove} onClick={onToggleSearchOnMove} />
          <OverlayText>Redo Search on Move</OverlayText>
        </StyledDiv>
      </OverlayView>
    );
  }
}
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
    redoSearchOnMove: false,
  };

  onMapMounted = (map) => {
    refs.map = map;
  };

  onToggleSearchOnMove = () => {
    this.setState({
      redoSearchOnMove: !this.state.redoSearchOnMove,
    });
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

  onBoundsChange = () => {
    // Do something if this is checked
    if (this.state.redoSearchOnMove) {
      const { onParamsChange } = this.props;
      if (onParamsChange && typeof onParamsChange === 'function') {
        // Get Map's center and get latitude and longitude
        if (refs.map) {
          const center = refs.map.getCenter();
          const lat = center.lat();
          const long = center.lng();
          const { latitude, longitude } = this.props;
          if (preciseCoordinate(lat) !== preciseCoordinate(latitude) && preciseCoordinate(long) !== preciseCoordinate(longitude)) {
            onParamsChange({ changedParams: { latitude: lat, longitude: long, searchOnMove: this.state.redoSearchOnMove } });
          }
        }
      }
    }
  };

  render() {
    const { latitude, longitude, communityList } = this.props;
    const center = {
      latitude,
      longitude,
    };
    if (latitude === 0 && longitude === 0) {
      return <div>Loading Map...</div>;
    }
    const markers = [];

    // TODO Move to constants and helpers for things like isMobile?
    const isMobile = false; // window && window.innerWidth < size('breakpoint.tablet');
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
        onBoundsChanged={this.onBoundsChange}
        onMapMounted={this.onMapMounted}
      >
        {markerComponents}
        <RedoSearchDiv latitude={latitude} longitude={longitude} redoSearchOnMove={this.state.redoSearchOnMove}
         onToggleSearchOnMove={this.onToggleSearchOnMove}/>
      </Map>
    );
  }
}

export default SearchMap;
