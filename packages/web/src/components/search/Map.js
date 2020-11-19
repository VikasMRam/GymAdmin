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

const Map = forwardRef(({
  defaultCenter,
  communities,
  center,
  zoom,
  onChange,
  onMarkerClick,
  selectedCommunity,
  ...props }, ref) => {
  const onDrag = useMemo(() => debounce((map) => {
    onChange(map);
  }, 200), []);

  const onZoom = useCallback((map) => {
    onChange(map);
  }, []);

  const onChildClickCallback = (key) => {
    const community = communities.find(x => x.id === key);
    onMarkerClick(community);
  };

  const breakpoint = useBreakpoint();
  const [hoveredMarker, setHoveredMarker] = useState();
  selectedCommunity = hoveredMarker || selectedCommunity;

  const selectedCommunityTile = selectedCommunity && (
    <MapCommunityTile community={selectedCommunity} />
  );

  return (
    <Block
      ref={ref}
      {...props}
    >
      <GoogleMap
        bootstrapURLKeys={{ key: gMapsApiKey }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={3}
        hoverDistance={50}
        onClick={() => onMarkerClick(null)}
        onChildClick={onChildClickCallback}
        onChildMouseEnter={(_, { community }) => setHoveredMarker(community)}
        onChildMouseLeave={() => setHoveredMarker(null)}
        onDrag={onDrag}
        onZoomAnimationEnd={onZoom}
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
              key={id}
              community={community}
              active={selectedCommunity?.id === id}
              lat={latitude}
              lng={longitude}
              number={i + 1}
            />
          );
        })}
        {breakpoint?.atLeastLaptop() && selectedCommunityTile}
      </GoogleMap>

      {breakpoint?.upToLaptop() && selectedCommunityTile}
    </Block>
  );
});

Map.defaultProps = {
  communities: [],
};

Map.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  communities: arrayOf(object),
  onChange: func,
  zoom: number,
  onMarkerClick: func,
  selectedCommunity: object,
};

export default Map;
