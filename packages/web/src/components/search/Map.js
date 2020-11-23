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
import STYLES from 'sly/web/constants/map';
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

let redoSearchOnMove = false;

const Map = ({
  communities,
  meta,
  onFilterChange,
  onMarkerClick,
  onMarkerHover,
  selectedCommunity,
  cursor,
  ...props }) => {
  const breakpoint = useBreakpoint();
  const [mapRef, mapDimensions] = useDimensions();
  const [mapCenter, setMapCenter] = useState(null);

  const apiMetaCenter = useMemo(() => slyToApiPoint(meta?.geo), [meta]);
  const bounds = useMemo(() => getBoundsForSearchResults(communities), [communities]);
  const boundsCenter = useMemo(() => getBoundsCenter(bounds), [bounds]);

  useEffect(() => {
    if (!mapCenter) {
      const { lat, lng } = boundsCenter || apiMetaCenter;
      setMapCenter({
        lat,
        lng,
        // this gives a default zoom if there are no bounds
        zoom: findOptimalZoomForBounds(bounds, mapDimensions),
      });
    }
  }, [apiMetaCenter, boundsCenter]);

  const onDrag = useMemo(() => debounce((event) => {
    if (redoSearchOnMove) {
      const { lat, lng } = event.center.toJSON();
      const geo = getGeographyFromMap({ lat, lng, zoom: event.zoom }, mapDimensions);
      onFilterChange(GEO, geo.join(','));
      setMapCenter({
        lat,
        lng,
        zoom: event.zoom,
      });
    }
  }, 200), [mapDimensions, redoSearchOnMove]);

  const onZoom = useCallback((zoom) => {
    const { lat, lng } = mapCenter;
    const geo = getGeographyFromMap({ lat, lng, zoom }, mapDimensions);
    onFilterChange(GEO, geo.join(','));
    setMapCenter({
      lat,
      lng,
      zoom,
    });
  }, [mapDimensions]);

  const onChildClickCallback = useCallback((key) => {
    const community = communities.find(({ id }) => id === key);
    onMarkerClick(community);
  }, [communities]);

  const selectedCommunityTile = selectedCommunity && (
    <MapCommunityTile
      community={selectedCommunity}
      index={cursor + communities.indexOf(selectedCommunity)}
      lat={selectedCommunity.latitude}
      lng={selectedCommunity.longitude}
    />
  );

  const onRedoToggle = (toggled) => {
    redoSearchOnMove = toggled;
  };
  const handleOnLoad = ({ map, maps }) => {
    const controlButtonDiv = document.createElement('div');
    // eslint-disable-next-line no-unused-vars
    const _ = new SearchOnMoveControl(controlButtonDiv, map, onRedoToggle);
    map.controls[maps.ControlPosition.TOP_RIGHT].push(controlButtonDiv);
  };

  return (
    <Block
      ref={mapRef}
      {...props}
    >
      <GoogleMap
        googleMapLoader={maps.getMaps}
        center={mapCenter}
        defaultZoom={DEFAULT_ZOOM}
        hoverDistance={HOVER_DISTANCE}
        onClick={() => onMarkerClick(null)}
        onChildClick={onChildClickCallback}
        onChildMouseEnter={(_, { community }) => onMarkerHover(community)}
        onChildMouseLeave={() => onMarkerHover(null)}
        onDrag={onDrag}
        onZoomAnimationEnd={onZoom}
        zoom={mapCenter?.zoom}
        options={maps => ({
          fullscreenControl: false,
          zoomControl: true,
          zoomControlOptions: {
           position: maps.ControlPosition.TOP_LEFT,
          },
          styles: STYLES,
         })}
        onGoogleApiLoaded={handleOnLoad}
      >
        {communities.map((community, i) => {
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
};

export default Map;
