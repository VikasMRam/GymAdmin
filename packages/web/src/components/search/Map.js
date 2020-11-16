import React, { useCallback, forwardRef, useState } from 'react';
import { arrayOf, object, func, number, bool } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';

import Marker from './MapMarker';

import coordPropType from 'sly/common/propTypes/coordPropType';
import { gMapsApiKey } from 'sly/web/config';
import Block from 'sly/common/components/atoms/Block';
import STYLES from 'sly/web/constants/map';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';

const Map = forwardRef(({
  defaultCenter,
  communities,
  center,
  zoom,
  onChange,
  onMarkerClick,
  selectedCommunity,
  mapDimensions,
  fixCommunityTileAtBottom,
  ...props
}, ref) => {
  const onDrag = useCallback(debounce((map) => {
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
        onChildClick={onChildClickCallback}
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
        {communities.map(({ latitude, longitude, id }, i) => (
          <Marker
            key={id}
            selectedCommunity={selectedCommunity && selectedCommunity.id === id ? selectedCommunity : null}
            lat={latitude}
            lng={longitude}
            number={i + 1}
            mapDimensions={mapDimensions}
            fixCommunityTileAtBottom={fixCommunityTileAtBottom}
            onMouseEnter={breakpoint && breakpoint.isLaptop() ? () => setHoveredMarker(communities[i]) : null}
            onMouseLeave={breakpoint && breakpoint.isLaptop() ? () => setHoveredMarker(null) : null}
          />
        ))}
      </GoogleMap>
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
  mapDimensions: object,
  fixCommunityTileAtBottom: bool,
};

export default Map;
