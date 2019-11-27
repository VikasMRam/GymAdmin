import React, { Component } from 'react';
import { string, number, shape, arrayOf } from 'prop-types';
import styled from 'styled-components';
import { Marker, InfoWindow } from 'react-google-maps';
import debounce from 'lodash/debounce';
import { isServer } from 'sly/config';
import { size, palette } from 'sly/components/themes';
import Checkbox from 'sly/components/molecules/Checkbox';
import Map from 'sly/components/atoms/Map';
import MapTile from 'sly/components/molecules/MapTile';
import GreenMarker from 'sly/../public/icons/greenmarker.png';
import { getRadiusFromMapBounds } from 'sly/services/helpers/search';

const MapWrapper = styled.div`
  width: 100%;
  height: 80vh;
  position: relative;
`;

const MapContainerElement = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: ${size('spacing.large')};
`;

const MapOverlayDiv = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: ${palette('white', 'base')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  width: 230px;
  height: auto;
  padding: calc(${size('spacing.regular')} + ${size('spacing.small')}) ${size('spacing.regular')};
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled(Checkbox)`
  margin: ${size('spacing.regular')};
`;

const refs = {
  map: undefined,
};

const minRadius = 10;

class SearchMap extends Component {
  static propTypes = {
    latitude: number.isRequired,
    longitude: number.isRequired,
    communityList: arrayOf(
      shape({
        id: string.isRequired,
        name: string.isRequired,
        startingRate: number.isRequired,
        imageUrl: string.isRequired,
        latitude: number.isRequired,
        longitude: number.isRequired,
      })
    ),
  };

  static getDerivedStateFromProps = (props, state) => {
    return Object.assign(
      {},
      !props.isLoading && { communityList: props.communityList },
      state.hasValidDefaultLocation && {
        defaultCenter: { lat: props.latitude, lng: props.longitude },
        hasValidDefaultLocation: props.latitude !== 0 && props.longitude !== 0,
      }
    );
  };

  state = {
    communityList: this.props.communityList,
    activeInfoWindowId: null,
    redoSearchOnMove: true,
    hasValidDefaultLocation: this.props.latitude !== 0 && this.props.longitude !== 0,
    defaultCenter: { lat: this.props.latitude, lng: this.props.longitude },
  };

  onMapMounted = (map) => {
    refs.map = map;
  };

  onToggleSearchOnMove = () => {
    this.setState({
      redoSearchOnMove: !this.state.redoSearchOnMove,
    });
  };

  setActiveMarker = (id) => {
    this.setState({
      activeInfoWindowId: id,
    });
  };

  onBoundsChange = debounce(() => {
    // Do something if this is checked
    if (this.state.redoSearchOnMove) {
      const { onParamsChange, searchParams } = this.props;
      if (onParamsChange && typeof onParamsChange === 'function') {
        // Get Map's center and get latitude and longitude
        if (refs.map) {
          const center = refs.map.getCenter();
          const latitude = center.lat();
          const longitude = center.lng();
          // Calculate radius
          let radius = getRadiusFromMapBounds(refs.map.getBounds());
          if (radius < minRadius) {
            radius = minRadius;
          }
          if (
            searchParams.latitude !== latitude.toString() ||
            searchParams.longitude !== longitude.toString() ||
            searchParams.radius !== radius.toString()
          ) {
            onParamsChange({
              changedParams: {
                latitude,
                longitude,
                radius,
              },
            });
          }
        }
      }
    }
  }, 200);

  render() {
    const { latitude, longitude } = this.props;
    const { defaultCenter, communityList, redoSearchOnMove } = this.state;

    if (latitude === 0 && longitude === 0) {
      return <div>Loading Map...</div>;
    }

    if (isServer) return null;

    const defaultZoom = window.innerWidth < size('breakpoint.tablet') ? 12 : 13;

    return (
      <MapWrapper>
        <MapOverlayDiv>
          <StyledCheckbox checked={redoSearchOnMove} onClick={this.onToggleSearchOnMove} />
          Redo Search on Move
        </MapOverlayDiv>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          containerElement={<MapContainerElement />}
          onIdle={this.onBoundsChange}
          onMapMounted={this.onMapMounted}
        >
          {communityList.map(community => (
            <Marker
              key={community.id}
              position={{ lat: community.latitude, lng: community.longitude }}
              defaultIcon={GreenMarker}
              onClick={() => this.setActiveMarker(community.id)}
            >
              {this.state.activeInfoWindowId === community.id && (
                <InfoWindow key={community.id} onCloseClick={() => this.setActiveMarker(null)}>
                  <MapTile
                    tileInfo={{
                      id: community.id,
                      name: community.name,
                      startingRate: community.startingRate,
                      mainImage: community.imageUrl,
                      url: community.url,
                      propInfo: {
                        communityDescription: community.description,
                        typeCare: community.webViewInfo.firstLineValue.split(','),
                      },
                      propRatings: {
                        reviewsValue: community.reviewsValue,
                        numReviews: community.numReviews,
                      },
                    }}
                    borderless
                  />
                </InfoWindow>
              )}
            </Marker>
          ))}
        </Map>
      </MapWrapper>
    );
  }
}

export default SearchMap;
