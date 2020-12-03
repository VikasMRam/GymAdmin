import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { arrayOf, object, func, number } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';

import Marker from './Marker';
import SearchOnMoveControl from './SearchOnMoveControl';

import Block from 'sly/common/components/atoms/Block';
import mapsTheme from 'sly/web/components/themes/maps';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import MapCommunityTile from 'sly/web/components/search/MapCommunityTile';
import {
  GEO,
} from 'sly/web/components/search/Filters';
import {
  maps,
  DEFAULT_ZOOM,
  HOVER_DISTANCE,
  findOptimalZoomForBounds,
  getBoundsCenter,
  getBoundsForSearchResults,
  getGeographyFromMap,
  slyToApiPoint,
} from 'sly/web/components/search/maps';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import { PinDefs } from 'sly/web/components/search/Pin';
import {
  coordsFromGeoFilter,
  COMPONENT_STATE,
  MAP,
  NONE,
} from 'sly/web/components/search/helpers';
import SlyEvent from 'sly/web/services/helpers/events';

const eventCategory = 'search-map';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const Map = ({
  communities,
  meta,
  onFilterChange,
  onMarkerClick,
  onMarkerHover,
  selectedCommunity,
  cursor,
  currentFilters,
  ...props }) => {
  const breakpoint = useBreakpoint();
  const [mapRef, mapDimensions] = useDimensions();
  const [mapCenter, setMapCenter] = useState(coordsFromGeoFilter(currentFilters.geo));
  const [redoSearchOnMove, setRedoSearchOnMove] = useState(false);

  const apiMetaCenter = useMemo(() => slyToApiPoint(meta?.geo), [meta]);
  const bounds = useMemo(() => getBoundsForSearchResults(communities), [communities]);
  const boundsCenter = useMemo(() => getBoundsCenter(bounds), [bounds]);

  useEffect(() => {
    if (mapCenter?.controlled === MAP) {
      return;
    }

    const { lat, lng } = (boundsCenter && boundsCenter.lat !== 0) ? boundsCenter : apiMetaCenter;
    const zoom = bounds ? findOptimalZoomForBounds(bounds, mapDimensions) : DEFAULT_ZOOM;

    setMapCenter({
      lat,
      lng,
      // this gives a default zoom if there are no bounds
      zoom,
      controlled: COMPONENT_STATE,
    });
  }, [apiMetaCenter, boundsCenter, mapDimensions]);

  const onChange = useCallback(({ center: { lat, lng }, zoom }) => {
    if (mapCenter.controlled === COMPONENT_STATE) {
      setMapCenter({
        ...mapCenter,
        controlled: NONE,
      });
    } else if (redoSearchOnMove) {
      sendEvent('map-move', 'redo-search-on');
      const geo = getGeographyFromMap({
        lat,
        lng,
        zoom,
      }, mapDimensions);
      onFilterChange(GEO, geo.join(','));
      setMapCenter({
        lat,
        lng,
        zoom,
        controlled: MAP,
      });
    } else {
      sendEvent('map-move', 'redo-search-off');
    }
  }, [redoSearchOnMove, mapCenter, mapDimensions]);

  const onChildClickCallback = useCallback((key) => {
    const community = communities.find(({ id }) => id === key);
    const index = cursor + communities.indexOf(community);

    sendEvent('pin-click', community.name , index);
    onMarkerClick(community);
  }, [communities]);

  const onMapMarkerHover = useCallback((community) => {
    const index = cursor + communities.indexOf(community);
    sendEvent('pin-hover', community.name , index);
    onMarkerHover(community);
  }, [communities]);

  const selectedCommunityTile = selectedCommunity && (
    <MapCommunityTile
      community={selectedCommunity}
      index={cursor + communities.indexOf(selectedCommunity)}
      lat={selectedCommunity.latitude}
      lng={selectedCommunity.longitude}
    />
  );
  const onRedoToggle = useCallback(() => {
    sendEvent('redo-search', redoSearchOnMove ? 'off' : 'on');
    setRedoSearchOnMove(!redoSearchOnMove);
  });

  return (
    <Block
      ref={mapRef}
      overflow="hidden"
      {...props}
    >
      <PinDefs />
      <SearchOnMoveControl
        active={redoSearchOnMove}
        onClick={onRedoToggle}
        css={{
          zIndex: 1000,
          position: 'absolute',
          right: 0,
        }}
      />
      <GoogleMap
        googleMapLoader={maps.getMaps}
        center={mapCenter}
        zoom={mapCenter?.zoom}
        hoverDistance={HOVER_DISTANCE}
        onChange={onChange}
        onClick={() => onMarkerClick(null)}
        onChildClick={onChildClickCallback}
        onChildMouseEnter={(_, { community }) => onMapMarkerHover(community)}
        onChildMouseLeave={() => onMarkerHover(null)}
        options={maps => ({
          zoomControl: true,
          fullscreenControl: false,
          zoomControlOptions: {
           position: maps.ControlPosition.TOP_LEFT,
          },
          draggable: true,
          gestureHandling: "greedy",
          clickableIcons: false,
          styles: mapsTheme.propertyDetailTheme,
         })}
      >
        {mapDimensions.width && communities.map((community, i) => {
          const { latitude, longitude, id } = community;
          return (
            <Marker
              key={id}
              community={community}
              active={selectedCommunity?.id === id}
              lat={latitude}
              lng={longitude}
              number={cursor + i}
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
  cursor: number,
  communities: arrayOf(object),
  meta: object,
  onFilterChange: func,
  onMarkerClick: func,
  onMarkerHover: func,
  selectedCommunity: object,
  currentFilters: object,
};

export default Map;
