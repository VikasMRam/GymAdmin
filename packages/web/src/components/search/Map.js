import React, { useCallback, forwardRef, useState, useMemo } from 'react';
import { arrayOf, object, func, number, bool } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';

import Marker from './Marker';

import coordPropType from 'sly/common/propTypes/coordPropType';
import { gMapsApiKey } from 'sly/web/config';
import Block from 'sly/common/components/atoms/Block';
import STYLES from 'sly/web/constants/map';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import MapCommunityTile from 'sly/web/components/search/MapCommunityTile';
import { GEO } from 'sly/web/components/search/Filters';
import {
  DEFAULT_ZOOM,
  findOptimalZoomForBounds,
  getBoundsCenter,
  getBoundsForSearchResults, getVisibleRadius, HOVER_DISTANCE,
  slyToApiPoint,
} from 'sly/web/components/search/maps';
import useDimensions from 'sly/common/components/helpers/useDimensions';

const Map = ({
  communities,
  meta,
  onFilterChange,
  onMarkerClick,
  selectedCommunity,
  communityIndex,
  hoveredCommunity,
  page,
  pageSize,
  ...props }) => {
  const breakpoint = useBreakpoint();
  const [mapRef, mapDimensions] = useDimensions();
  const [mapCenter, setMapCenter] = useState(null);

  const onMapChange = useCallback((event) => {
    if (!event || !event.center) {
      return
    }
    const { lat, lng } = event.center.toJSON();
    onFilterChange(GEO, `${lat},${lng},${getVisibleRadius(mapDimensions, lng, event.zoom).toFixed(2)}`);
    setMapCenter({
      lat,
      lng,
      zoom: event.zoom,
    });
  }, [mapDimensions]);

  const onDrag = useMemo(() => debounce(onMapChange, 200), [mapDimensions]);

  const onChildClickCallback = useCallback((key) => {
    const community = communities[key];
    onMarkerClick(community, key);
  }, [communities]);

  const apiMetaCenter = useMemo(() => slyToApiPoint(meta?.geo), [meta]);
  const bounds = useMemo(() => getBoundsForSearchResults(communities), [communities]);
  const boundsCenter = useMemo(() => getBoundsCenter(bounds), [bounds]);
  const zoom = useMemo(() => {
    return mapCenter?.zoom || findOptimalZoomForBounds(bounds, mapDimensions);
  }, [bounds, mapDimensions, mapCenter?.zoom]);

  const [hoveredMarker, setHoveredMarker] = useState();
  selectedCommunity = hoveredMarker || selectedCommunity;
  communityIndex = hoveredMarker ? communities.indexOf(hoveredMarker) + 1 : communityIndex;

  const selectedCommunityTile = selectedCommunity && (
    <MapCommunityTile
      community={selectedCommunity}
      index={(page*pageSize) + communityIndex}
      lat={selectedCommunity.latitude}
      lng={selectedCommunity.longitude}
    />
  );

  return (
    <Block
      ref={mapRef}
      {...props}
    >
      <GoogleMap
        bootstrapURLKeys={{ key: gMapsApiKey }}
        center={mapCenter || boundsCenter || apiMetaCenter}
        defaultZoom={DEFAULT_ZOOM}
        hoverDistance={HOVER_DISTANCE}
        onClick={() => onMarkerClick(null)}
        onChildClick={onChildClickCallback}
        onChildMouseEnter={(_, { community }) => setHoveredMarker(community)}
        onChildMouseLeave={() => setHoveredMarker(null)}
        onDrag={onDrag}
        onZoomAnimationEnd={onMapChange}
        zoom={zoom}
        options={maps => ({
          zoomControl: true,
          zoomControlOptions: {
           position: maps.ControlPosition.TOP_LEFT,
          },
          styles: STYLES,
         })}
      >
        {communities.map((community, i) => {
          const { latitude, longitude, id } = community;
          return (
            <Marker
              key={i}
              community={community}
              active={selectedCommunity?.id === id || hoveredCommunity?.id === id}
              lat={latitude}
              lng={longitude}
              number={(page*pageSize) + (i + 1)}
            />
          );
        })}
        {breakpoint?.atLeastLaptop() && selectedCommunityTile}
      </GoogleMap>

      {breakpoint?.upToLaptop() && selectedCommunityTile}
    </Block>
  );
};

Map.defaultProps = {
  communities: [],
};

Map.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  communities: arrayOf(object),
  onChange: func,
  zoom: number,
  meta: object,
  onFilterChange: func,
  onMarkerClick: func,
  selectedCommunity: object,
};

export default Map;
